'use server'

import { Database } from '@/supabase/schema'
import { createClient } from '@/app/service/supabase/server'

type Streamer = Database['public']['Tables']['streamers']['Row']

export async function getStreamers(): Promise<Streamer[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('streamers').select('*')

  return data ?? []
}
