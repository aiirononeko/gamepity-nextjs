'use server'

import { createClient } from '@/lib/supabase/server'
import type { AvailableDateTime } from '@/types/availableDateTime'
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

  revalidatePath('/available-date-times')

  return data
}

export const deleteAvailableDateTime = async (availableDateTimeId: number) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('available_date_times')
    .delete()
    .eq('id', availableDateTimeId)
  if (error) {
    console.error(error.message)
    throw error
  }

  revalidatePath('/available-date-times')
}
