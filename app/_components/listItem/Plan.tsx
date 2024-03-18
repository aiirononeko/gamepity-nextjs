import * as client from '@prisma/client'

type Props = {
  plan: client.Plan
}

export default function Plan(data: Props) {
  const { plan } = data

  return <p>{plan.name}</p>
}
