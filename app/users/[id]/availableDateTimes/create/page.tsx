import AvailableDateTimeForm from '@/app/_components/form/AvailableDateTimeForm'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const streamerId = Number(params.id)

  return <AvailableDateTimeForm isNew={true} userId={streamerId} />
}
