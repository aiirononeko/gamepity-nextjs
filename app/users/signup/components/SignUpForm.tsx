'use client'

import { signUpUserWithEmail } from '@/actions/auth'

export default function SignUpForm() {
  return (
    <form className='mx-auto mt-20 w-full max-w-sm' action={signUpUserWithEmail}>
      <div className='mb-6 flex flex-col'>
        <label className='mb-1 block pr-4 text-left font-bold text-game-gray-500'>
          ユーザー名
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name='name'
          type='text'
          placeholder='ゲームピティ男'
        />
      </div>
      <div className='mb-6 flex flex-col'>
        <label className='mb-1 block pr-4 text-left font-bold text-gray-500'>
          メールアドレス
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name='email'
          type='email'
          placeholder='gamepity@example.com'
        />
      </div>
      <div className='mb-10 flex flex-col'>
        <label className='mb-1 block pr-4 text-left font-bold text-gray-500'>
          パスワード
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name='password'
          type='password'
          placeholder='******************'
        />
      </div>
      <div className='mb-1 flex flex-col'>
        <label className='block font-bold text-gray-500'>
          <input className='mr-2 leading-tight' type='checkbox' />
          <span className='text-sm'>利用規約に同意する</span>
        </label>
      </div>
      <div className='mb-10 flex flex-col'>
        <label className='block font-bold text-gray-500'>
          <input className='mr-2 leading-tight' type='checkbox' />
          <span className='text-sm'>プライバシーポリシーに同意する</span>
        </label>
      </div>
      <div className='md:flex md:items-center'>
        <button
          className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'
          type='submit'
        >
          新規会員登録
        </button>
      </div>
    </form>
  )
}
