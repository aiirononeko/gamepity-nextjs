'use server'

import { Database } from '@/supabase/schema'
import { createClient } from '@/lib/supabase/server'

type Review = Database['public']['Tables']['reviews']['Row']

export async function getReviews(streamerId: string): Promise<Review[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('streamer_id', streamerId)

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}
