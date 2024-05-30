import SignUpForm from '@/app/users/signup/components/SignUpForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser } from '@/data/auth'
import { redirect } from 'next/navigation'

export default async function UserSignUp() {
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
            <BreadcrumbPage>ユーザー登録</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='my-8'>
        <SignUpForm />
      </div>
    </div>
  )
}
