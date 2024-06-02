'use server'

import { createClient } from '@/lib/supabase/server'
import { reviewSchema } from '@/schemas/review'
import type { z } from 'zod'
import { sendReviewdEmailToStreamer } from './resend'
import { updateReviewId } from './reservation'

export const createReview = async (input: z.infer<typeof reviewSchema>) => {
  const result = reviewSchema.safeParse(input)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const {
    rating,
    comment,
    userId,
    userName,
    streamerId,
    streamerEmail,
    planId,
    reservationId,
  } = input

  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      rating: Number(rating),
      comment,
      user_id: userId,
      streamer_id: streamerId,
      plan_id: planId,
    })
    .select()
    .single()
  if (error) {
    console.error(error)
    throw error
  }

  await updateReviewId(reservationId, data.id)

  // ストリーマーにメールを送信
  await sendReviewdEmailToStreamer(streamerEmail, userName, data)
}
