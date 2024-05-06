'use server'

import { redirect } from 'next/navigation'
import { createStripeAccount } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { signUpSchema } from '@/schemas/signUp'
import { parseWithZod } from '@conform-to/zod'
import type { Session, User } from '@supabase/supabase-js'

export async function signUpUserWithEmail(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signUpSchema,
  })
  if (submission.status !== 'success') return submission.reply()

  const { name, email, password } = submission.value

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
  if (error) return submission.reply({ formErrors: [error.message] })

  return redirect('/users/signup/completed')
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

  const stripeAccount = await createStripeAccount(email)

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_streamer: true,
        name,
        stripe_account_id: stripeAccount.id,
      },
      emailRedirectTo: 'https://gamepity.com/signin',
    },
  })
  if (error) throw error
  if (!data.user) {
    return {
      user: null,
      session: null,
    }
  }

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
