'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createReviewSchema } from '@/schemas/review'
import { parseWithZod } from '@conform-to/zod'

export const createReview = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: createReviewSchema,
  })
  if (submission.status !== 'success') return submission.reply()

  const { rating, comment, userId, streamerId, planId } = submission.value

  const supabase = createClient()
  const { error } = await supabase.from('reviews').insert({
    rating,
    comment,
    user_id: userId,
    streamer_id: streamerId,
    plan_id: planId,
  })
  if (error) return submission.reply({ formErrors: [error.message] })

  redirect('/users/mypage')
}
