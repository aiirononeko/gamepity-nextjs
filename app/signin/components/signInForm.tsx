'use client'

import { signInWithEmail } from '@/app/actions/auth'

export default function SignInForm() {
  return (
    <>
    <form className='mx-auto mt-32 w-full max-w-sm' action={signInWithEmail}>
      <div className='mb-6 flex flex-col'>
        <label className='mb-1 block pr-4 text-left font-bold text-gray-500'>
          メールアドレス
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          id='inline-full-name'
          type='email'
          placeholder='gamepity@example.com'
        />
      </div>
      <div className='mb-16 flex flex-col'>
        <label className='mb-1 block pr-4 text-left font-bold text-gray-500'>
          パスワード
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          id='inline-password'
          type='password'
          placeholder='******************'
        />
      </div>
      <div className='md:flex md:items-center'>
        <button
          className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'
          type='button'
        >
          ログイン
        </button>
      </div>
    </form>
    <div className='mx-auto w-full max-w-sm'>
    <p className='my-10 text-center text-game-gray-500'>または</p>
    <button
          className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r px-8 py-3 text-game-white'
          type='button'
        >
         新規会員登録 
        </button>
      </div>
    </>
  )
}