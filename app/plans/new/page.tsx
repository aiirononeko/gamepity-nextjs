import { PlanForm } from '@/app/plans/new/components/PlanForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getGames } from '@/data/game'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const games = await getGames()

  return (
    <div className='container mx-auto my-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/plans'>プラン管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>プラン作成</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlanForm streamerId={user.id} games={games} />
    </div>
  )
}
