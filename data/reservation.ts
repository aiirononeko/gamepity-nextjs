import { createClient } from '@/lib/supabase/server'
import { Database } from '@/supabase/schema'

type Reservation = Database['public']['Tables']['reservations']['Row']

export const getReservations = async (userId: string): Promise<Reservation[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .eq('is_available', true)
    .gt('start_date_dime', new Date().toUTCString())
  if (error) throw error

  return data
}

export const getCompletedReservations = async (
  userId: string,
): Promise<Reservation[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id', userId)
    .eq('is_available', true)
    .lt('start_date_dime', new Date().toUTCString())
  if (error) throw error

  return data
}
