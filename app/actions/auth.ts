'use server'

import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/app/service/supabase"

/**
 * Supabase Authにユーザー登録します.
 */
export async function signUpWithPassword(formData: FormData): Promise<{
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
        name: name,
        profile: null,
        icon_url: null,
        is_admin: false,
        is_streamer: false,
        stripe_account_id: null,
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
