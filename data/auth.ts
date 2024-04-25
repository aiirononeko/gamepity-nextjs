import { createClient } from '@/lib/supabase/server'
import { AuthUser, User } from '@supabase/supabase-js'

export async function getCurrentUser(): Promise<AuthUser | null> {
  'use server'

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
  }

  return data.user
}

export function isStreamer(user: User) {
  'use client'

  return user.user_metadata['is_streamer']
}
