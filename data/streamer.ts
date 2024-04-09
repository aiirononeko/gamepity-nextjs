'use server'

import { Database } from '@/supabase/schema'
import { createClient } from '@/lib/supabase/server'

type Streamer = Database['public']['Tables']['streamers']['Row']

export async function getStreamers(): Promise<Streamer[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('streamers').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getStreamer(id: string): Promise<Streamer> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('streamers')
    .select('*')
    .eq('id', id)
    .limit(1)

  if (error || !data) {
    throw Error('Failed to fetch streamer.')
  }

  return data[0]
}
