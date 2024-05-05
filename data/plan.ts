'use server'

import { createClient } from '@/lib/supabase/server'
import { Plan } from '@/types/plan'

export async function getPlan(planId: number): Promise<Plan> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .select()
    .eq('id', planId)
    .limit(1)
    .single()

  if (error) throw new Error(error.message)

  return data
}
