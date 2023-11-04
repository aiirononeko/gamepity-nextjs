import { Plan } from '@prisma/client'

type Props = {
  plan: Plan
}

export default function Plan(data: Props) {
  const { plan } = data

  return <p>{plan.name}</p>
}
