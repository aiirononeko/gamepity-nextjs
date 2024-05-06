'use client'

import Link from 'next/link'
import { signInWithEmail } from '@/actions/auth'
import { signInSchema } from '@/schemas/signIn'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'

export default function SignInForm() {
  const [lastResult, action] = useFormState(signInWithEmail, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInSchema })
    },
    shouldValidate: 'onBlur',
  })

  return (
    <>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
        className='mx-auto mt-20 w-full max-w-sm'
      >
        <div className='mb-6 flex flex-col'>
          <label
            htmlFor={fields.email.id}
            className='mb-1 block pr-4 text-left font-bold text-gray-500'
          >
            メールアドレス
          </label>
          <input
            name={fields.email.name}
            type='email'
            placeholder='gamepity@example.com'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          />
          <span className='mt-1 text-red-500'>{fields.email.errors}</span>
        </div>
        <div className='mb-14 flex flex-col'>
          <label
            htmlFor={fields.password.id}
            className='mb-1 block pr-4 text-left font-bold text-gray-500'
          >
            パスワード
          </label>
          <input
            name={fields.password.name}
            type='password'
            placeholder='******************'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          />
          <span className='mt-1 text-red-500'>{fields.password.errors}</span>
        </div>
        <div className='md:flex md:items-center'>
          <button
            className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'
            type='submit'
          >
            ログイン
          </button>
        </div>
      </form>
      <div className='mx-auto w-full max-w-sm'>
        <p className='my-6 text-center text-game-gray-500'>または</p>
        <Link href='/users/signup'>
          <button
            className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r px-8 py-3 text-game-white'
            type='button'
          >
            新規会員登録
          </button>
        </Link>
      </div>
    </>
  )
}
