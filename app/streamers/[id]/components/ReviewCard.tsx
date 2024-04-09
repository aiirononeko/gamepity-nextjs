import { Database } from '@/supabase/schema'

type Props = {
  review: Database['public']['Tables']['reviews']['Row']
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className='p-2'>
      <p className='line-clamp-2 text-game-white'>{review.comment}</p>
    </div>
  )
}
