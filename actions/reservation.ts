'use server'

import { createStripePaymentLink } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { reservationSchema } from '@/schemas/reservation'
import { redirect } from 'next/navigation'
import type { z } from 'zod'
import { disableAvailableDateTime } from './availableDateTime'

export const createReservation = async (
  input: z.infer<typeof reservationSchema>,
) => {
  const result = reservationSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const {
    availableDateTimeId,
    startDateTime,
    streamerId,
    userId,
    planId,
    stripeAccountId,
    stripePriceId,
    amount,
  } = input

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
