'use server'

import { createClient } from '@/lib/supabase/client'

// import { createClient } from '@/lib/supabase/server'
// import type { AvailableDateTime } from '@/types/availableDateTime'

// export const createAvailableDateTimes = async (
//   availableDateTimes: AvailableDateTime[],
// ) => {
//   const supabase = createClient()
//
//   availableDateTimes.forEach(async (availableDateTime) => {
//     const { error } = await supabase
//       .from('available_date_times')
//       .upsert(availableDateTime)
//     if (error) {
//       console.error(error)
//       throw error
//     }
//   })
// }

export const createAvailableDateTime = async (
  startDateTime: string,
  streamerId: string,
) => {
  'use client'

  const supabase = createClient()
  const { data, error } = await supabase
    .from('available_date_times')
    .insert({
      start_date_time: startDateTime,
      streamer_id: streamerId,
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
