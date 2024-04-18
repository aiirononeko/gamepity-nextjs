import { createClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js'

export async function getCurrentUser() {
  'use server'

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    return null
  }

  return data.user
}

export function isStreamer(user: User) {
  'use client'

  return user.user_metadata['is_streamer']
}
