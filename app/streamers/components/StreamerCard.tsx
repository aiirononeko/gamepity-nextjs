import { Database } from '@/supabase/schema'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  streamer: Database['public']['Tables']['streamers']['Row']
}

export default function StreamerCard(data: Props) {
  const { streamer } = data

  return (
    <Link href={`/streamers/${streamer.id}`}>
      <div>
        {streamer.icon_url ? (
          <Image
            alt={`${streamer.name}のアイコン`}
            src={streamer.icon_url}
            width={250}
            height={200}
          />
        ) : (
          <div className='h-52 w-full rounded-t-xl bg-game-gray-500 text-game-gray-300'></div>
        )}
        <div className='h-48 w-full rounded-b-xl bg-game-gray-700 p-5'>
          <p className='mb-4 text-xl font-bold text-game-white'>{streamer.name}</p>
          <p className='mb-6 line-clamp-3 text-xs text-game-gray-300'>
            {streamer.profile}
          </p>
        </div>
      </div>
    </Link>
  )
}
