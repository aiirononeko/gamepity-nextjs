'use server'

import { supabase } from '@/app/service/supabase'
import { Database } from '@/supabase/schema'

type Streamer = Database['public']['Tables']['streamers']['Row']

export async function getStreamers(): Promise<Streamer[]> {
  const { data, error } = await supabase.from('streamers').select('*')
  return data ?? []
}
