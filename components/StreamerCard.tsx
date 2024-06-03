import type { Streamer } from '@/types/streamer'
import Image from 'next/image'
import Link from 'next/link'
import Rating from './Rating'
import { Card, CardContent, CardHeader } from './ui/card'

type Props = {
  streamer: Streamer
}

export default function StreamerCard({ streamer }: Props) {
  return (
    <div className='h-[380px] w-[352px] transition duration-300 hover:-translate-y-3'>
      <Link href={`/streamers/${streamer.id}`}>
        <Card>
          <CardHeader className='p-0 pb-3'>
            {streamer.icon_url ? (
              <div className='relative h-[220px] w-[352px]'>
                <Image
                  alt={`${streamer.name}のアイコン`}
                  src={streamer.icon_url}
                  fill={true}
                />
              </div>
            ) : (
              <div className='h-[220px] w-[352px]'></div>
            )}
          </CardHeader>
          <CardContent className='h-[140px] w-[352px] space-y-2'>
            <div>
              <p className='text-xl font-bold'>{streamer.name}</p>
              <Rating
                star={streamer.avg_rating ?? 0}
                size={12}
                readOnly={true}
                withLabel={true}
              />
            </div>
            <p className='line-clamp-4 whitespace-pre-wrap text-xs'>
              {streamer.profile}
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
