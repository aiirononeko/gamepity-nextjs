import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { currentUser, isStreamer } from '@/data/auth'
import { getPlans } from '@/data/plan'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlanCard } from './components/PlanCard'
import { PlanDialog } from './components/PlanDialog'

export const metadata: Metadata = {
  title: 'プラン管理 | Gamepity',
  description: 'プラン管理ページ',
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await currentUser()
  if (!user || !isStreamer(user)) redirect('/signin')

  const plans = await getPlans(user.id)

  const open = Boolean(searchParams.open) ?? false

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href='/'>トップ</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>プラン管理</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>プラン管理</h2>
      <Button variant='outline' className='w-44' asChild>
        <Link href='/plans/new'>プランを追加</Link>
      </Button>
      <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
        {plans.map((plan) => (
          // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <PlanDialog open={open} />
    </div>
  )
}
