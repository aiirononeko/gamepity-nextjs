'use server'

import { createClient } from '@/lib/supabase/server'

export async function getPlans(streamerId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('plans')
    .select(
      `
      id,
      name,
      description,
      amount,
      plans_games!inner (
        game_id (
          id,
          name
        )
      )
    `,
    )
    .eq('streamer_id', streamerId)
  if (error) throw error

  return data
}

export async function getPlan(planId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('plans')
    .select()
    .eq('id', planId)
    .single()
  if (error) throw error

  return data
}
