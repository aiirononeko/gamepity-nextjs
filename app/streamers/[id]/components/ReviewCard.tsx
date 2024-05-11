import { Review } from '@/types/review'

type Props = {
  review: Review
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className='p-2'>
      <p className='text-game-white line-clamp-2'>{review.comment}</p>
    </div>
  )
}
