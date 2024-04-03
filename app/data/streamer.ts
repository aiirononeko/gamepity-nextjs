'use server'

import { supabase } from '@/app/service/supabase'
import { Database } from '@/supabase/schema'

type Streamer = Database['public']['Tables']['users']['Row']

export async function getStreamers(): Promise<Streamer[]> {
  const { data, error } = await supabase.from('users').select('*').eq('is_streamer', true)
  return data ?? []
}
