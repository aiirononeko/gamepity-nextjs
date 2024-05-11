import ReviewCard from '@/app/streamers/[id]/components/ReviewCard'
import type { Review } from '@/types/review'
import type { Streamer } from '@/types/streamer'

type Props = {
  reviews: Review[]
  streamer: Streamer
}

export default function Review(props: Props) {
  const { reviews, streamer } = props

  return (
    <div className='bg-game-gray-600 flex h-72 w-full flex-row items-center justify-center gap-16'>
      <div className='space-y-3'>
        <p className='text-game-white text-center text-5xl font-bold'>
          {streamer.avg_rating?.toFixed(1)}
        </p>
        <p className='text-game-gray-300 text-center'>{reviews.length}レビュー</p>
      </div>
      <div className='w-1/2 space-y-3'>
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
