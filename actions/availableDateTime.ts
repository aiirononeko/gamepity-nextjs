'use server'

import { createClient } from '@/lib/supabase/server'
import type { AvailableDateTime } from '@/types/availableDateTime'
import type { SupabaseClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

export const createAvailableDateTime = async (
  startDateTime: string,
  streamerId: string,
): Promise<AvailableDateTime> => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('available_date_times')
    .insert({
      start_date_time: startDateTime,
      streamer_id: streamerId,
    })
    .select()
    .single()

  if (error) {
    console.error(error.message)
    throw error
  }

  const count = await getAvailableDateTimesCount(supabase, streamerId)
  await updateStreamerAvailableDateTimesCount(supabase, streamerId, count)

  revalidatePath('/available-date-times')

  return data
}

export const deleteAvailableDateTime = async (
  availableDateTimeId: number,
  streamerId: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('available_date_times')
    .delete()
    .eq('id', availableDateTimeId)

  if (error) {
    console.error(error.message)
    throw error
  }

  const count = await getAvailableDateTimesCount(supabase, streamerId)
  await updateStreamerAvailableDateTimesCount(supabase, streamerId, count)

  revalidatePath('/available-date-times')
}

const getAvailableDateTimesCount = async (
  supabase: SupabaseClient,
  streamerId: string,
) => {
  const { count, error } = await supabase
    .from('available_date_times')
    .select('*', { count: 'exact', head: true })
    .eq('streamer_id', streamerId)

  if (error) {
    console.error(error)
    throw error
  }

  return count ?? 0
}

const updateStreamerAvailableDateTimesCount = async (
  supabase: SupabaseClient,
  streamerId: string,
  count: number,
) => {
  const { error } = await supabase
    .from('streamers')
    .update({ available_date_times_count: count })
    .eq('id', streamerId)

  if (error) {
    console.error(error)
    throw error
  }
}
