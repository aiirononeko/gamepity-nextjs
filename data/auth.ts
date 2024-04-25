import { createClient } from '@/lib/supabase/server'
import { AuthUser, User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function getCurrentUser(): Promise<AuthUser> {
  'use server'

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    redirect('/signin')
  }

  if (!data.user) redirect('/signin')

  return data.user
}

export function isStreamer(user: User) {
  'use client'

  return user.user_metadata['is_streamer']
}
