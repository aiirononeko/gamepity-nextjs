import supabase from '@/app/_lib/supabase'
import { AuthError } from '@supabase/supabase-js'

export const useAuth = () => {
  /**
   * メールアドレスとパスワードでサインアップする.
   */
  const signUp = async (
    email: string,
    password: string,
  ): Promise<{
    data: {
      user: any
      session: any
    }
    error: AuthError | null
  }> => {
    // Supabase Authにユーザー登録
    const { data, error } = await supabase.auth.signUp({ email, password })

    // ユーザー情報をDBに登録

    return { data, error }
  }

  /**
   * サインアウト.
   */
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { signUp, signOut }
}
