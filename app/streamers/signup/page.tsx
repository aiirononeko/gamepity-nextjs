import { SignUpAction } from '@/app/_actions/SignUpAction'
import SignUpForm from '@/app/_components/form/SignUpForm'

export default function StreamerSignUp() {
  const { streamerSignUpAction } = SignUpAction()

  return <SignUpForm action={streamerSignUpAction} />
}
