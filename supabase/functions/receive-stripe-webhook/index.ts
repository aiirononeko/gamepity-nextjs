import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
)

Deno.serve(async (request: any) => {
  // HeaderとBodyを抽出
  const signature = request.headers.get('Stripe-Signature')
  const body = await request.text()

  // イベントデータを取得
  const receivedEvent = verifyClientSecret(signature, body)

  // イベントデータから各種データを抽出
  const { userId, streamerId } = await extractDataFromEvent(receivedEvent)

  console.log(userId, streamerId)

  // try {
  //   // 仮予約データを取得し、予約可能日時のトランザクション処理
  //   const { data, error } = await supabase
  //     .from('Reservation')
  //     .select('*')
  //     .eq('userId', userId)
  //     .eq('streamerId', streamerId)
  //     .order('created_at', { ascending: false })
  //     .limit(1)
  //
  //   if (error) {
  //     throw error
  //   }
  //
  //   // 予約データ更新
  //
  //   return new Response(JSON.stringify({ data }), {
  //     headers: { 'Content-Type': 'application/json' },
  //     status: 200,
  //   })
  // } catch (e) {
  //   console.log(e)
  // }
})

/**
 * Requestに含まれる署名シークレットがStripeのものか確認する.
 * 問題なければイベントデータを返却.
 */
const verifyClientSecret = async (signature: any, body: any) => {
  try {
    const receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider,
    )

    console.log(`🔔 Event received: ${receivedEvent.id}`)

    // EventIDからイベントデータを取得
    const eventData = await stripe.events.retrieve(receivedEvent.id)

    return eventData
  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 400 })
  }
}

/**
 * StripeのWebhookイベントからデータを抽出します.
 *
 */
const extractDataFromEvent = async (
  event: any,
): Promise<{
  userId: number
  streamerId: number
}> => {
  const userId = await getUserId(event.payment_method)
  const streamerId = await getStreamerId(event.transfer_data.destination)

  return {
    userId,
    streamerId,
  }
}

/**
 * PaymentMethodIdからUserIdを取得します.
 */
const getUserId = async (paymentMethodId: string): Promise<number> => {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
  console.log(paymentMethod)

  const email = paymentMethod.billing_details.email

  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    throw error
  }

  return data.id
}

/**
 * StripeAccountIdからStreamerIdを取得します.
 */
const getStreamerId = async (stripeAccountId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('stripeAccountId', stripeAccountId)
    .single()

  if (error) {
    throw error
  }

  return data.id
}
