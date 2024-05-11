import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.6'
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)

console.log('Hello from Stripe Webhook!')

Deno.serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')

  const body = await req.text()
  try {
    const receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider,
    )
    console.log(`🔔 Event received: ${receivedEvent.id}`)

    // 決済したユーザーの仮予約データを取得
    const { userId, streamerId } = receivedEvent.data.object.metadata
    const temporaryReservation = await getTempReservation(userId, streamerId)

    // 仮予約データを有効化
    await activateTempReservation(temporaryReservation.id)

    // ユーザーに予約完了メールを送信
    await sendEmailToUser(receivedEvent.data.object.customer_details.email)

    // ストリーマーに予約通知メールを送信
    const streamerEmail = await getStreamerEmail(streamerId)
    await sendEmailToStreamer(streamerEmail)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
})

const getTempReservation = async (userId: string, streamerId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .eq('streamer_id', streamerId)
    .eq('is_available', false)
    .single()
  if (error) {
    console.error(error)
    throw error
  }
  if (!data) console.error('Reservation data is not found.')

  return data
}

const activateTempReservation = async (tempReservationId: number) => {
  const { error } = await supabase
    .from('reservations')
    .update({ is_available: true })
    .eq('id', tempReservationId)
  if (error) {
    console.error(error)
    throw error
  }
}

const getStreamerEmail = async (streamerId: string) => {
  const { data, error } = await supabase.auth.getUser(streamerId)
  if (error) {
    console.error(error)
    throw error
  }
  if (!data.user.email) {
    console.error('streamer was not found.')
    throw new Error()
  }

  return data.user.email
}

const sendEmailToUser = async (email: string) => {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY') as string}`,
    },
    body: JSON.stringify({
      from: 'Gamepity <noreply@gamepity.com>',
      to: [email],
      subject: '予約が完了しました',
      html: `
        <p>この度はGamepityをご利用いただき誠にありがとうございます。</p>
        <p>ストリーマーの予約が完了しましたのでお知らせいたします。</p>
        <p>Gamepityのマイページから予約を確認いただき、予定の時間になりましたらDiscordから参加下さい。</p>
        <a href="https://gamepity.com/users/mypage">マイページはこちら</a>
        <br>
        <p>Gamepity 運営</p>
      `,
    }),
  })
}

const sendEmailToStreamer = async (email: string) => {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY') as string}`,
    },
    body: JSON.stringify({
      from: 'Gamepity <noreply@gamepity.com>',
      to: [email],
      subject: '【Gamepity】予約通知',
      html: `
        <p>ユーザーがあなたのプランを購入しましたのでお知らせいたします。</p>
        <p>Gamepityのマイページから予約を確認いただき、予定の時間になりましたらDiscordから参加下さい。</p>
        <a href="https://gamepity.com/streamers/mypage">マイページはこちら</a>
        <br>
        <p>Gamepity 運営</p>
      `,
    }),
  })
}
