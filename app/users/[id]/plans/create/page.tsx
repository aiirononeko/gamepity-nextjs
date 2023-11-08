import PlanForm from '@/app/_components/form/PlanForm'
import { fetchUserWithId } from '@/app/_services/userService'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const user = await fetchUserWithId(Number(params.id))
  if (!user) redirect('/')

  return <PlanForm userId={user.id} stripeAccountId={user.stripeAccountId} />
}
