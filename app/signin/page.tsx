import { SignInAction } from '../_actions/SignInAction'
import SignInForm from '../_components/form/SignInForm'

export default function SignIn() {
  const { signInAction } = SignInAction()
  return <SignInForm action={signInAction} />
}
