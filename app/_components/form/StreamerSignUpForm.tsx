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
    const user = await registUser(name.toString(), email.toString(), true)

    // マイページに遷移.
    redirect(`/users/${user?.id}`)
  }
}

export default function StreamerSignUpForm() {
  return (
    <form className='w-full max-w-sm' action={signUpAction}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            ユーザーネーム
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='name'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-full-name'
            type='text'
            placeholder='player'
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            メールアドレス
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='email'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-email'
            type='text'
            placeholder='gamepity@exampla.com'
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            パスワード
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='password'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-password'
            type='password'
            placeholder='******************'
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'></div>
        <label className='md:w-2/3 block text-gray-500 font-bold'>
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
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            ユーザー登録する
          </button>
        </div>
      </div>
    </form>
  )
}
