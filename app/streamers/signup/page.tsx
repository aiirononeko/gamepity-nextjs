import SignUpForm from '@/app/streamers/signup/components/SignUpForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser } from '@/data/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if (user) redirect('/')

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ストリーマー登録</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>ストリーマー登録</h2>
      <SignUpForm />
    </div>
  )
}
