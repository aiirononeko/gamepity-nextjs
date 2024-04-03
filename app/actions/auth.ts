'use server'

import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/app/service/supabase'

export async function signUpUserWithEmail(formData: FormData): Promise<
  | {
      user: User | null
      session: Session | null
    }
  | {
      user: null
      session: null
    }
> {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!name || !email || !password) {
    return {
      user: null,
      session: null,
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: false,
        name,
      },
    },
  })

  if (error) {
    console.error(error)
    return {
      user: null,
      session: null,
    }
  }

  return data
}

export async function signUpStreamerWithEmail(formData: FormData): Promise<
  | {
      user: User | null
      session: Session | null
    }
  | {
      user: null
      session: null
    }
> {
  const name = formData.get('name')?.toString()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!name || !email || !password) {
    return {
      user: null,
      session: null,
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: true,
        name,
      },
    },
  })

  if (error) {
    console.error(error)
    return {
      user: null,
      session: null,
    }
  }

  return data
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return // TODO: エラーハンドリング
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}
