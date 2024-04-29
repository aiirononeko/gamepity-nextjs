'use server'

import { redirect } from 'next/navigation'
import { createStripePaymentLink } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { disableAvailableDateTime } from './availableDateTime'

export const createReservation = async (formData: FormData) => {
  const availableDateTimeId = Number(formData.get('availableDateTimeId'))
  const startDateTime = formData.get('startDateTime')?.toString()
  const streamerId = formData.get('streamerId')?.toString()
  const userId = formData.get('userId')?.toString()
  const planId = Number(formData.get('planId'))
  const stripePriceId = formData.get('stripePriceId')?.toString()

  if (!availableDateTimeId || !startDateTime || !streamerId || !userId || !planId || !stripePriceId) return

  // reservationデータ作成
  const supabase = createClient()
  const { data, error } = await supabase.from('reservations').insert({
    start_date_dime: startDateTime,
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    streamer_id: streamerId,
    user_id: userId,
    plan_id: planId,
  }).select('*').single()
  if (error) throw error

  await disableAvailableDateTime(availableDateTimeId, data.id)

  // payment_link作成
  const paymentLink = await createStripePaymentLink(stripePriceId, userId, streamerId)

  // 作成したpayment_linkに遷移
  redirect(paymentLink.url)

  // 遷移先で支払いが成功した場合、webhookで検知してreservationデータを有効化する
  // 支払いが成功していないreservationがある場合、マイページに表示する
  // 決済完了してreservationデータが有効化された場合、availableDateTimeを削除する
  // 決済が完了せずreservationデータが有効化されていない場合、availableDateTimeのisDisabledをfalseに戻す
}
