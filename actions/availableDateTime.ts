'use server'

import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { AvailableDateTime } from '@/types/availableDateTime'

export const createAvailableDateTime = async (
  startDateTime: string,
  streamerId: string,
): Promise<AvailableDateTime> => {
  'use client'

  const supabase = createClient()
  const { data, error } = await supabase
    .from('available_date_times')
    .insert({
      start_date_time: startDateTime,
      streamer_id: streamerId,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export const deleteAvailableDateTime = async (availableDateTimeId: number) => {
  'use client'

  const supabase = createClient()
  const { error } = await supabase
    .from('available_date_times')
    .delete()
    .eq('id', availableDateTimeId)
  if (error) throw new Error(error.message)
}

export const disableAvailableDateTime = async (
  availableDateTimeId: number,
  reservationId: number,
) => {
  'use server'

  const supabase = createServerClient()
  const { error } = await supabase
    .from('available_date_times')
    .update({ is_reserved: true, reservation_id: reservationId })
    .eq('id', availableDateTimeId)
  if (error) throw error
}
