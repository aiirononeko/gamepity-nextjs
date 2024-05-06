'use server'

import { redirect } from 'next/navigation'
import { createStripeAccount } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { signUpStreamerSchema, signUpUserSchema } from '@/schemas/signUp'
import { parseWithZod } from '@conform-to/zod'

export async function signUpUserWithEmail(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signUpUserSchema,
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

export async function signUpStreamerWithEmail(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signUpStreamerSchema,
  })
  if (submission.status !== 'success') return submission.reply()

  const { name, email, password } = submission.value

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
        emailRedirectTo: 'https://gamepity.com/signin',
      },
    })
    if (error) return submission.reply({ formErrors: [error.message] })

    return redirect('/streamers/signup/completed')
  } catch (e) {
    return submission.reply()
  }
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
