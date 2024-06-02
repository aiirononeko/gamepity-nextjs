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

    const {
      reservationId,
      availableDateTimeId,
      streamerEmail,
      streamerDiscordUrl,
      userEmail,
    } = receivedEvent.data.object.metadata

    // 仮予約データを有効化
    await activateTempReservation(reservationId)

    // 予約可能日時を削除
    await deleteAvailableDateTime(availableDateTimeId)

    // ユーザーに予約完了メールを送信
    await sendEmailToUser(userEmail, streamerDiscordUrl)

    // ストリーマーに予約通知メールを送信
    await sendEmailToStreamer(streamerEmail)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
})

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

const deleteAvailableDateTime = async (availableDateTimeId: number) => {
  const { error } = await supabase
    .from('available_date_times')
    .delete()
    .eq('id', availableDateTimeId)
  if (error) {
    console.error(error)
    throw error
  }
}

const sendEmailToUser = async (email: string, discordUrl: string) => {
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
        <p>Gamepityの予約確認画面から予約を確認いただき、予定の時間になりましたらDiscordからご参加下さい。</p>
        <br>
        <a href=${discordUrl}>専用のDiscordサーバーはこちら</a>
        <br>
        <a href="https://gamepity.com/users/reservations">予約確認はこちら</a>
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
      subject: 'あなたのプランが予約されました',
      html: `
        <p>ユーザーがあなたのプランを購入しましたのでお知らせいたします。</p>
        <p>Gamepityの予約確認画面から予約を確認いただき、予定の時間になりましたらDiscordからご参加下さい。</p>
        <br>
        <a href="https://gamepity.com/reservations">予約管理はこちら</a>
        <br>
        <p>Gamepity 運営</p>
      `,
    }),
  })
}
