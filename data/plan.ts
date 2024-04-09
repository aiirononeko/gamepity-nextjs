'use server'

import { Database } from '@/supabase/schema'
import { createClient } from '@/lib/supabase/server'

type Plan = Database['public']['Tables']['plans']['Row']

export async function getPlans(streamerId: string): Promise<Plan[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('streamer_id', streamerId)

  if (error) throw error

  return data ?? []
}

export async function getPlan(planId: number): Promise<Plan> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .limit(1)

  if (error) throw error

  return data[0]
}
