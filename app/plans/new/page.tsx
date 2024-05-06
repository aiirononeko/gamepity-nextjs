import { redirect } from 'next/navigation'
import { PlanForm } from '@/app/plans/new/components/PlanForm'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getGames } from '@/data/game'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const games = await getGames()

  return <PlanForm streamerId={user.id} games={games} />
}
