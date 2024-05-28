import { redirect } from 'next/navigation'
import { PlanCard } from './components/PlanCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getPlans } from '@/data/plan'

export default async function Page() {
  const user = await getCurrentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const plans = await getPlans(user.id)

  return (
    <div className='container mx-auto mt-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>プラン管理</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {plans && plans.length > 0 ? (
        <div className='my-8'>
          <div className='space-y-4'>
            {plans.map((plan) => (
              // @ts-ignore
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      ) : (
        <div className='mb-10 mt-6 flex items-center justify-center'>
          <p className='text-xl font-bold text-game-white'>プランがありません</p>
        </div>
      )}
    </div>
  )
}
