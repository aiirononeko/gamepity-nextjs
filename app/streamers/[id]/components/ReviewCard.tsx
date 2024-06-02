import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getPlan } from '@/data/plan'
import { getUser } from '@/data/user'
import type { Review } from '@/types/review'

type Props = {
  review: Review
}

export default async function PlanCard({ review }: Props) {
  const reviewer = await getUser(review.user_id)
  const plan = await getPlan(review.plan_id)

  return (
    <Card className='w-[350px] md:transition md:duration-300 md:hover:-translate-y-3'>
      <CardHeader>
        <CardTitle>{review.rating}</CardTitle>
        <CardDescription>{plan.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4 whitespace-pre-wrap'>{review.comment}</p>
        <p className='text-xs'>{reviewer.name}さんのレビュー</p>
      </CardContent>
    </Card>
  )
}
