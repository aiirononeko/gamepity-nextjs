import { SignUpAction } from '@/app/_actions/SignUpAction'
import SignUpForm from '@/app/_components/form/SignUpForm'

export default async function UserSignUp() {
  const { userSignUpAction } = SignUpAction()

  return <SignUpForm action={userSignUpAction} />
}
