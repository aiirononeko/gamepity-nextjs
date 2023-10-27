import supabase from '@/app/_lib/supabase'
import { AuthTokenResponse, AuthError } from '@supabase/supabase-js'

/**
 * サインアップ.
 */
export const signUp = async (
  email: string,
  password: string,
): Promise<{
  data: {
    user: any
    session: any
  }
}> => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new AuthError('Failed to sign up.')

  return { data }
}

/**
 * サインイン.
 */
export const signIn = async (email: string, password: string) => {
  const { data, error }: AuthTokenResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new AuthError('Failed to sign in.')
  return data.user
}

/**
 * サインアウト.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new AuthError('Failed to sign out.')
}
