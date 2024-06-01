'use server'

import { createClient } from '@/lib/supabase/server'

export async function getUser(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()

  if (error) {
    console.error(error.message)
    throw error
  }

  return data
}
