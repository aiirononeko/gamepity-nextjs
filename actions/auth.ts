'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Session, User } from '@supabase/supabase-js'
import { createStripeAccount } from '@/actions/stripe'
import { updateStripeAccountId } from '@/actions/streamer'

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

  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: false,
        name,
      },
      emailRedirectTo: 'https://gamepity.com/',
    },
  })

  if (error) throw error

  redirect('/users/signup/completed')
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

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: true,
        name,
      },
      emailRedirectTo: 'https://gamepity.com/',
    },
  })
  if (error) throw error
  if (!data.user) {
    return {
      user: null,
      session: null
    }
  }

  const stripeAccount = await createStripeAccount(email)
  await updateStripeAccountId(data.user.id, stripeAccount.id)

  redirect('/streamers/signup/completed')
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error

  redirect('/users/mypage')
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw error

  redirect('/')
}
