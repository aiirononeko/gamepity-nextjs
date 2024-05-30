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
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[330px] md:mt-10 md:flex-none md:space-y-12'>
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
      <h2 className='text-xl font-bold'>プラン管理</h2>
      <div className='my-8'>
        <Button variant='outline' className='w-44' asChild>
          <Link href='/plans/new'>プランを追加</Link>
        </Button>
        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {plans.map((plan) => (
            // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  )
}
