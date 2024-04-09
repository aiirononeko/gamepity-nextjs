'use server'

import { Database } from '@/supabase/schema'
import { createClient } from '@/lib/supabase/server'

type Plan = Database['public']['Tables']['plans']['Row']

export async function getPlan(planId: number): Promise<Plan> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .limit(1)

  if (error) throw new Error(error.message)

  return data[0]
}
