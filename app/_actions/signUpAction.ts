import { signUp } from '@/app/_hooks/useAuth'
import { registUser } from '@/app/_hooks/useUser'
import { redirect } from 'next/navigation'

export const SignUpAction = () => {
  const userSignUpAction = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if (name && email && password) {
      await signUp(email.toString(), password.toString())
      const { id } = await registUser(name.toString(), email.toString(), false)

      // マイページに遷移.
      redirect(`/users/${id}`)
    }
  }

  const streamerSignUpAction = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if (name && email && password) {
      await signUp(email.toString(), password.toString())
      const { id } = await registUser(name.toString(), email.toString(), true)

      // マイページに遷移.
      redirect(`/users/${id}`)
    }
  }

  return { userSignUpAction, streamerSignUpAction }
}
