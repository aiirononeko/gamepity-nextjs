'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const createReview = async (formData: FormData) => {
  const rating = Number(formData.get('rating'))
  const comment = formData.get('comment')?.toString()
  const planId = Number(formData.get('planId'))
  const userId = formData.get('userId')?.toString()
  const streamerId = formData.get('streamerId')?.toString()

  if (!rating || !planId || !userId || !streamerId) return

  const supabase = createClient()
  const { error } = await supabase.from('reviews').insert({
    rating,
    comment,
    created_at: new Date().toUTCString(),
    plan_id: planId,
    user_id: userId,
    streamer_id: streamerId,
  })
  if (error) throw error

  redirect('/users/mypage')
}
