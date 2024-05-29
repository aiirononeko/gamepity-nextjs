import { redirect } from 'next/navigation'
import SignInForm from '@/app/signin/components/signInForm'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCurrentUser } from '@/data/auth'

export default async function SignIn() {
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
            <BreadcrumbPage>ログイン</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='my-8'>
        <SignInForm />
      </div>
    </div>
  )
}
