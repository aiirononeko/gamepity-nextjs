'use client'

import { signUpUserWithEmail } from '@/actions/auth'
import { signUpUserSchema } from '@/schemas/signUp'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'

export default function SignUpForm() {
  const [lastResult, action] = useFormState(signUpUserWithEmail, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpUserSchema })
    },
    shouldValidate: 'onBlur',
  })

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className='mx-auto mt-20 w-full max-w-sm'
    >
      <div className='mb-6 flex flex-col'>
        <label
          htmlFor={fields.name.id}
          className='mb-1 block pr-4 text-left font-bold text-game-gray-500'
        >
          ユーザー名
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name={fields.name.name}
          type='text'
          placeholder='ゲームピティ男'
        />
        <span className='mt-1 text-game-white'>{fields.name.errors}</span>
      </div>
      <div className='mb-6 flex flex-col'>
        <label
          htmlFor={fields.email.id}
          className='mb-1 block pr-4 text-left font-bold text-gray-500'
        >
          メールアドレス
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name={fields.email.name}
          type='email'
          placeholder='gamepity@example.com'
        />
        <span className='mt-1 text-game-white'>{fields.email.errors}</span>
      </div>
      <div className='mb-10 flex flex-col'>
        <label
          htmlFor={fields.password.id}
          className='mb-1 block pr-4 text-left font-bold text-gray-500'
        >
          パスワード
        </label>
        <input
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
          name={fields.password.name}
          type='password'
          placeholder='******************'
        />
        <span className='mt-1 text-game-white'>{fields.password.errors}</span>
      </div>
      <div className='mb-4'>
        <div className='mb-1 flex items-center'>
          <input
            type='checkbox'
            name={fields.hasAgreedWithTermsOfService.name}
            className='size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
          />
          <label
            htmlFor={fields.hasAgreedWithTermsOfService.id}
            className='ms-2 text-sm font-medium text-game-white'
          >
            <a
              href='https://www.notion.so/9f18b38032884fe8915c7addad0e7f0e?pvs=4'
              target='_blank'
              className='text-sm'
            >
              <span className='underline hover:text-blue-600'>利用規約</span>に同意する
            </a>
          </label>
        </div>
        <span className='text-game-white'>
          {fields.hasAgreedWithTermsOfService.errors}
        </span>
      </div>
      <div className='mb-10'>
        <div className='mb-1 flex items-center'>
          <input
            type='checkbox'
            name={fields.hasAgreedWithPrivacyPolicy.name}
            className='size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
          />
          <label
            htmlFor={fields.hasAgreedWithPrivacyPolicy.id}
            className='ms-2 text-sm font-medium text-game-white'
          >
            <a
              href='https://www.notion.so/116df216216d478d9ab909e53d6475a9?pvs=4'
              target='_blank'
              className='text-sm'
            >
              <span className='underline hover:text-blue-600'>プライバシーポリシー</span>
              に同意する
            </a>
          </label>
        </div>
        <span className='text-game-white'>
          {fields.hasAgreedWithPrivacyPolicy.errors}
        </span>
      </div>
      <div className='md:flex md:items-center'>
        <button
          className='w-full rounded border-2 border-solid border-game-white px-8 py-3 text-game-white'
          type='submit'
        >
          新規会員登録
        </button>
      </div>
    </form>
  )
}
