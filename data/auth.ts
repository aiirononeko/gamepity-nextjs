import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

export async function currentUser() {
  'use server'

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
  }

  return data.user
}

export function isStreamer(user: User): boolean {
  return user.user_metadata['is_streamer']
}
