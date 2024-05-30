import type { Review } from '@/types/review'

type Props = {
  review: Review
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className='p-2'>
      <p className='line-clamp-2 text-game-white'>{review.comment}</p>
    </div>
  )
}
