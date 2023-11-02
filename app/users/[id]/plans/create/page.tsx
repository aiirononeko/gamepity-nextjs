import PlanForm from '@/app/_components/form/PlanForm'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const streamerId = Number(params.id)

  return <PlanForm isNew={true} userId={streamerId} />
}
