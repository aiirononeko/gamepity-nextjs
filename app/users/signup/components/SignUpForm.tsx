import { signUpWithPassword } from "@/app/actions/auth";

export default function SignUpForm() {
  return (
    <form action={signUpWithPassword}>
      <input type='email' name='email' placeholder='gamepity@example.com' />
      <input type='password' name='password' placeholder='password12345@' />
      <button type='submit'>登録</button>
    </form>
  )
}
