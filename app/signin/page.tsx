import SignInForm from '@/app/signin/components/signInForm'
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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
            <BreadcrumbPage>ログイン</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>ログイン</h2>
      <SignInForm
        hasConfirmationRedirected={
          searchParams.code !== undefined && searchParams.code !== ''
        }
      />
    </div>
  )
}
