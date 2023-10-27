import { signIn } from '@/app/_hooks/useAuth'
import { redirect } from 'next/navigation'

export const SignInAction = () => {
  const signInAction = async (formData: FormData) => {
    'use server'

    const email = formData.get('email')
    const password = formData.get('password')

    if (email && password) {
      await signIn(email.toString(), password.toString())

      // マイページに遷移.
      redirect(`/users/1`)
    }
  }

  return { signInAction }
}
