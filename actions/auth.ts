'use server'

import { createStripeAccount } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { signInSchema } from '@/schemas/signIn'
import { signUpStreamerSchema, signUpUserSchema } from '@/schemas/signUp'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.gamepity.com'

export async function signUpUserWithEmail(
  data: z.infer<typeof signUpUserSchema>,
) {
  const result = signUpUserSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const { name, email, password } = data

  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: false,
        name,
      },
      emailRedirectTo: `${baseUrl}/signin`,
    },
  })
  if (error) throw error

  redirect('/users/signup/completed')
}

export async function signUpStreamerWithEmail(
  data: z.infer<typeof signUpStreamerSchema>,
) {
  const result = signUpStreamerSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const { name, email, password } = data

  try {
    const stripeAccount = await createStripeAccount(email)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          is_streamer: true,
          name,
          stripe_account_id: stripeAccount.id,
        },
        emailRedirectTo: `${baseUrl}/signin`,
      },
    })
    if (error) throw error
  } catch (e) {
    console.error(e)
    throw e
  }

  redirect('/streamers/signup/completed')
}

export async function signInWithEmail(data: z.infer<typeof signInSchema>) {
  const result = signInSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const supabase = createClient()

  const { email, password } = data
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.error(error)
    throw error
  }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function withdrawal(id: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) {
    console.error(error.message)
    throw error
  }
}
