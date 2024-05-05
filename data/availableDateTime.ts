'use server'

import { createClient } from '@/lib/supabase/server'
import { AvailableDateTime } from '@/types/availableDateTime'
import { date } from '@formkit/tempo'

export async function getAvailableDateTimes(
  streamerId: string,
): Promise<AvailableDateTime[]> {
  const supabase = createClient()
  const today = date(new Date())
  const { data, error } = await supabase
    .from('available_date_times')
    .select()
    .gte('start_date_time', today.toUTCString())
    .eq('streamer_id', streamerId)
    .eq('is_reserved', false)

  if (error) throw new Error(error.message)

  return data ?? []
}

export async function getAvailableDateTime(
  availableDateTimeId: number,
): Promise<AvailableDateTime> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('available_date_times')
    .select()
    .eq('id', availableDateTimeId)
    .limit(1)
    .single()

  if (error) throw new Error(error.message)

  return data
}
