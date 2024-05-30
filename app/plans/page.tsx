import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { getCurrentUser, isStreamer } from '@/data/auth'
import { getPlans } from '@/data/plan'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlanCard } from './components/PlanCard'

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
      <div className='my-8'>
        <div className='mb-6'>
          <Link href='/plans/new'>
            <Button variant='outline' className='w-44 text-primary-foreground'>
              プランを追加
            </Button>
          </Link>
        </div>
        <div className='flex flex-nowrap space-x-8 overflow-y-auto md:py-3'>
          {plans.map((plan) => (
            // @ts-ignore
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  )
}
