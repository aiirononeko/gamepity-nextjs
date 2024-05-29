import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from './ui/card'
import type { Streamer } from '@/types/streamer'

type Props = {
  streamer: Streamer
}

export default function Streamer({ streamer }: Props) {
  return (
    <div className='h-[380px] w-[352px] transition duration-300 hover:-translate-y-3'>
      <Link href={`/streamers/${streamer.id}`}>
        <Card>
          <CardHeader className='p-0 pb-5'>
            {streamer.icon_url ? (
              <div className='relative h-[220px] w-[352px]'>
                <Image
                  alt={`${streamer.name}のアイコン`}
                  src={streamer.icon_url}
                  fill={true}
                />
              </div>
            ) : (
              <div className='h-220px h-52 w-[352px]'></div>
            )}
          </CardHeader>
          <CardContent>
            <div className='h-[140px]'>
              <p className='mb-4 text-xl font-bold'>{streamer.name}</p>
              <p className='mb-4 line-clamp-6 whitespace-pre-wrap text-xs'>
                {streamer.profile}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
