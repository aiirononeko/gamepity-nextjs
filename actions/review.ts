'use server'

import { createClient } from '@/lib/supabase/server'
import { reviewSchema } from '@/schemas/review'
import type { z } from 'zod'

export const createReview = async (data: z.infer<typeof reviewSchema>) => {
  const result = reviewSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors,
    }
  }

  const { rating, comment, userId, streamerId, planId } = data

  const supabase = createClient()
  const { error } = await supabase.from('reviews').insert({
    rating: Number(rating),
    comment,
    user_id: userId,
    streamer_id: streamerId,
    plan_id: planId,
  })
  if (error) {
    console.error(error)
    throw error
  }
}
