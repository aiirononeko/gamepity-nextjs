import { Database } from '@/supabase/schema'
import { createClient } from '../service/supabase/server'

type Plan = Database['public']['Tables']['plans']['Row']

export async function getPlans(streamerId: string): Promise<Plan[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('streamer_id', streamerId)

  if (error) {
    throw Error(error.message)
  }

  return data ?? []
}
