import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createSupabaseClient } from '@/app/_lib/supabase'
import { registUser } from '@/app/_services/userService'

const signUpAction = async (formData: FormData) => {
  'use server'

  const cookieStore = cookies()
  const supabase = createSupabaseClient(cookieStore)

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  if (name && email && password) {
    await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
    })
    await registUser({
      name: name.toString(),
      email: email.toString(),
      isStreamer: false,
    })

    // サインアップ完了ページに遷移
    redirect('/users/signup/completed')
  }
}

export default function UserSignUpForm() {
  return (
    <form className='w-full max-w-sm' action={signUpAction}>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            ユーザーネーム
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='name'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='player'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            メールアドレス
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='email'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-email'
            type='text'
            placeholder='gamepity@exampla.com'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            パスワード
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='password'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-password'
            type='password'
            placeholder='******************'
          />
        </div>
      </div>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <label className='block font-bold text-gray-500 md:w-2/3'>
          <input className='mr-2 leading-tight' type='checkbox' />
          <span className='text-sm'>
            <a href='/'>利用規約</a>に同意する
          </span>
        </label>
      </div>
      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className='focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none'
            type='submit'
          >
            ユーザー登録する
          </button>
        </div>
      </div>
    </form>
  )
}
