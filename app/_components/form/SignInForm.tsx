import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createSupabaseClient } from '@/app/_lib/supabase'

const signInAction = async (formData: FormData) => {
  'use server'

  const cookieStore = cookies()
  const supabase = createSupabaseClient(cookieStore)

  const email = formData.get('email')
  const password = formData.get('password')

  if (email && password) {
    await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    // マイページに遷移.
    redirect(`/users/1`)
  }
}

export default function SignInForm() {
  return (
    <div className='w-full max-w-xs'>
      <form
        className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
        action={signInAction}
      >
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            メールアドレス
          </label>
          <input
            name='email'
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            id='email'
            type='text'
            placeholder='gamepity@example.com'
          />
        </div>
        <div className='mb-6'>
          <label className='mb-2 block text-sm font-bold text-gray-700'>パスワード</label>
          <input
            name='password'
            className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            id='password'
            type='password'
            placeholder='******************'
          />
          <p className='text-xs italic text-red-500'>パスワードを入力してください</p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='submit'
          >
            ログイン
          </button>
          <Link
            className='inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800'
            href='#'
          >
            パスワードを忘れですか？
          </Link>
        </div>
      </form>
    </div>
  )
}
