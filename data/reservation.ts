import { createClient } from '@/lib/supabase/server'
import type { Reservation } from '@/types/reservation'

export const getStreamerReservations = async (
  streamerId: string,
): Promise<Reservation[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('streamer_id', streamerId)
    .eq('is_available', true)
    .gt('start_date_dime', new Date().toUTCString())
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}

export const getUserReservations = async (
  userId: string,
): Promise<Reservation[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('user_id', userId)
    .eq('is_available', true)
    .gt('start_date_dime', new Date().toUTCString())
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}

export const getCompletedUserReservations = async (
  userId: string,
): Promise<Reservation[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('user_id', userId)
    .eq('is_available', true)
    .lt('start_date_dime', new Date().toUTCString())
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}

export const getReservation = async (reservationId: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reservations')
    .select()
    .eq('id', reservationId)
    .single()
  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
