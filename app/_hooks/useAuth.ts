import supabase from '@/app/_lib/supabase'
import { AuthError } from '@supabase/supabase-js'

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
  // Supabase Authにユーザー登録
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw new AuthError('Failed to sign up.')

  return { data }
}

/**
 * サインアウト.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new AuthError('Failed to sign out.')
}
