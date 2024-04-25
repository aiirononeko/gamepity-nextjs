'use server'

import { redirect } from "next/navigation"
import { createStripePaymentLink } from "@/actions/stripe"
import { createClient } from "@/lib/supabase/server"

export const createReservation = async (formData: FormData) => {
  const startDateTime = formData.get('startDateTime')?.toString()
  const streamerId = formData.get('streamerId')?.toString()
  const userId = formData.get('userId')?.toString()
  const planId = Number(formData.get('planId'))
  const stripePriceId = formData.get('stripePriceId')?.toString()

  if (!startDateTime || !streamerId || !userId || !planId || !stripePriceId) return

  // reservationデータ作成
  const supabase = createClient()
  const { error } = await supabase.from('reservations').insert({
    start_date_dime: startDateTime,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    streamer_id: streamerId,
    user_id: userId,
    plan_id: planId
  })
  if (error) throw error

  // payment_link作成
  const paymentLink = await createStripePaymentLink(stripePriceId)

  // 作成したpayment_linkに遷移
  redirect(paymentLink.url)
  
  // 遷移先で支払いが成功した場合、webhookで検知してreservationデータを有効化する
  // 支払いが成功していないreservationがある場合、マイページに表示する
}
