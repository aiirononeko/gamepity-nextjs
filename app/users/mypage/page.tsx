import { redirect } from 'next/navigation'
import { signOut } from '@/actions/auth'
import Button from '@/app/components/Button'
import { getCurrentUser, isStreamer } from '@/data/auth'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')
  if (isStreamer(user)) redirect('/streamers/mypage')

  return (
    <div>
      <p className='mx-auto mt-12 text-center text-game-white'>{`${user.id}のマイページ`}</p>
      <form action={signOut}>
        <Button type='submit'>ログアウト</Button>
      </form>
    </div>
  )
}