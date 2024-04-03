'use server'

import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/app/service/supabase"

export async function signUpUserWithPassword(formData: FormData): Promise<{
  user: User | null,
  session: Session | null
} | {
  user: null,
  session: null
}> {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!name || !email || !password) {
    return {
      user: null,
      session: null
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: false,
        name
      }
    }
  })

  if (error) {
    console.error(error)
    return {
      user: null,
      session: null
    }
  }

  return data
}

export async function signUpStreamerWithPassword(formData: FormData): Promise<{
  user: User | null,
  session: Session | null
} | {
  user: null,
  session: null
}> {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!name || !email || !password) {
    return {
      user: null,
      session: null
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: true,
        name
      }
    }
  })

  if (error) {
    console.error(error)
    return {
      user: null,
      session: null
    }
  }

  return data
}
