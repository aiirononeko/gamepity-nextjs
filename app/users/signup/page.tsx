import { redirect } from 'next/navigation'
import SignUpForm from '@/app/users/signup/components/SignUpForm'
import { getCurrentUser } from '@/data/auth'

export default async function UserSignUp() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return <SignUpForm />
}
