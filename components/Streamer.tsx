import Image from 'next/image'
import Link from 'next/link'
import type { Streamer } from '@/types/streamer'

type Props = {
  streamer: Streamer
  width: string
}

export default function Streamer({ streamer, width }: Props) {
  return (
    <div className='transition duration-300 hover:-translate-y-1'>
      <Link href={`/streamers/${streamer.id}`}>
        {streamer.icon_url ? (
          <div className={`relative h-52 ${width}`}>
            <Image
              alt={`${streamer.name}のアイコン`}
              src={streamer.icon_url}
              fill={true}
            />
          </div>
        ) : (
          <div className={`h-52 bg-game-gray-500 ${width}`}></div>
        )}
        <div className={`h-48 rounded-b-xl bg-game-gray-700 p-5 ${width}`}>
          <p className='mb-4 text-xl font-bold text-game-white'>{streamer.name}</p>
          <p className='mb-4 line-clamp-6 text-xs text-game-gray-300'>
            {streamer.profile}
          </p>
        </div>
      </Link>
    </div>
  )
}
