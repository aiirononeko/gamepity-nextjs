'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/supabase/schema'
import { date } from '@formkit/tempo'

type AvailableDateTime = Database['public']['Tables']['available_date_times']['Row']

export async function getAvailableDateTimes(
  streamerId: string,
): Promise<AvailableDateTime[]> {
  const supabase = createClient()
  const today = date(new Date())
  const { data, error } = await supabase
    .from('available_date_times')
    .select('*')
    .gte('start_date_time', today.toUTCString())
    .eq('streamer_id', streamerId)

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function getAvailableDateTime(
  availableDateTimeId: number,
): Promise<AvailableDateTime> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('available_date_times')
    .select('*')
    .eq('id', availableDateTimeId)
    .limit(1)
    .single()

  if (error) throw new Error(error.message)

  return data
}
