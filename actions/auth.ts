'use server'

import { redirect } from 'next/navigation'
import { createStripeAccount } from '@/actions/stripe'
import { createClient } from '@/lib/supabase/server'
import { signInSchema } from '@/schemas/signIn'
import { signUpStreamerSchema, signUpUserSchema } from '@/schemas/signUp'
import { parseWithZod } from '@conform-to/zod'
import { z } from 'zod'

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
      emailRedirectTo: 'https://gamepity.com/signin',
    },
  })
  if (error) return submission.reply({ formErrors: [error.message] })

  redirect('/users/signup/completed')
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
  } catch (e) {
    console.error(e)
    return submission.reply()
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
  if (error) throw error
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}
