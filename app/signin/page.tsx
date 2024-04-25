import { redirect } from 'next/navigation'
import SignInForm from '@/app/signin/components/signInForm'
import { getCurrentUser } from '@/data/auth'

export default async function SignIn() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return <SignInForm />
}
