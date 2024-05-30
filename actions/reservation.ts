'use server'

import { createStripePaymentLink } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { disableAvailableDateTime } from './availableDateTime'

export const createReservation = async (formData: FormData) => {
  const availableDateTimeId = Number(formData.get('availableDateTimeId'))
  const startDateTime = formData.get('startDateTime')?.toString()
  const streamerId = formData.get('streamerId')?.toString()
  const userId = formData.get('userId')?.toString()
  const planId = Number(formData.get('planId'))
  const stripeAccountId = formData.get('stripeAccountId')?.toString()
  const stripePriceId = formData.get('stripePriceId')?.toString()
  const amount = Number(formData.get('amount'))

  if (
    !availableDateTimeId ||
    !startDateTime ||
    !streamerId ||
    !userId ||
    !planId ||
    !stripeAccountId ||
    !stripePriceId ||
    !amount
  )
    return

  // reservationデータ作成
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      start_date_dime: startDateTime,
      streamer_id: streamerId,
      user_id: userId,
      plan_id: planId,
    })
    .select('*')
    .single()
  if (error) throw error

  await disableAvailableDateTime(availableDateTimeId, data.id)

  // payment_link作成
  const paymentLink = await createStripePaymentLink(
    stripeAccountId,
    stripePriceId,
    userId,
    streamerId,
    amount,
  )

  // 作成したpayment_linkに遷移
  redirect(paymentLink.url)

  // 遷移先で支払いが成功した場合、webhookで検知してreservationデータを有効化する
  // 支払いが成功していないreservationがある場合、マイページに表示する
  // 決済完了してreservationデータが有効化された場合、availableDateTimeを削除する
  // 決済が完了せずreservationデータが有効化されていない場合、availableDateTimeのisDisabledをfalseに戻す
}
