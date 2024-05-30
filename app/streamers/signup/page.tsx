import { redirect } from 'next/navigation'
import SignUpForm from '@/app/streamers/signup/components/SignUpForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser } from '@/data/auth'

export default async function StreamerSignUp() {
  const user = await getCurrentUser()
  if (user) redirect('/')

  return (
    <div className='container mx-auto mt-12'>
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
      <div className='my-8'>
        <SignUpForm />
      </div>
    </div>
  )
}
