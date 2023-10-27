import Link from 'next/link'

export default function SignInForm(action: any) {
  return (
    <div className='w-full max-w-xs'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' action={action}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            メールアドレス
          </label>
          <input
            name='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='text'
            placeholder='gamepity@example.com'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>パスワード</label>
          <input
            name='password'
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='******************'
          />
          <p className='text-red-500 text-xs italic'>パスワードを入力してください</p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            ログイン
          </button>
          <Link
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
            href='#'
          >
            パスワードを忘れですか？
          </Link>
        </div>
      </form>
    </div>
  )
}
