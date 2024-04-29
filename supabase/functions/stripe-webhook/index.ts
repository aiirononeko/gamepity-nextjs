import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.6'

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
      cryptoProvider
    )
    console.log(`🔔 Event received: ${receivedEvent.id}`)

    // 決済したユーザーの仮予約データを取得
    const { userId, streamerId } = receivedEvent.data.object.metadata
    const temporaryReservation = await getTempReservation(userId, streamerId)

    // 仮予約データを有効化
    await activateTempReservation(temporaryReservation.id)

    // available_datetimesはここで操作すると、仮予約が二つ生まれる可能性があるため、
    // アプリケーション側で制御する
    // 仮予約データは作成後1時間で削除するように実装し、その際にavailable_datetimeもロールバックする

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    return new Response(err.message, { status: 400 })
  }
})

const getTempReservation = async (userId: string, streamerId: string) => {
  const { data, error } = await supabase.from('reservations').select('*').eq('user_id', userId).eq('streamer_id', streamerId).single()
  if (error) {
    console.error(error)
    throw error
  }
  if (!data) console.error('Reservation data is not found.')

  return data
}

const activateTempReservation = async (tempReservationId: string) => {
  const { error } = await supabase.from('reservations').update({ 'is_available': true }).eq('id', tempReservationId)
  if (error) {
    console.error(error)
    throw error
  }
}
