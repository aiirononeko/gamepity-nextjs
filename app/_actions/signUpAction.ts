'use server'

import { useAuth } from '@/app/_hooks/useAuth'
import { useUser } from '@/app/_hooks/useUser'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
  const { signUp } = useAuth()
  const { registUser } = useUser()

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  if (name && email && password) {
    // Supabase Auth にユーザー登録.
    const { error } = await signUp(email.toString(), password.toString())
    if (error) {
      console.log(error) // TODO
    }

    // DB にユーザーレコード登録
    await registUser(name.toString(), email.toString())
  }
}
