import Image from 'next/image'
import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  streamer: Database['public']['Tables']['streamers']['Row']
  width?: string
}

export default function Streamer(data: Props) {
  const { streamer, width = 'w-full' } = data

  return (
    <Link href={`/streamers/${streamer.id}`}>
      {streamer.icon_url ? (
        <div className={`h-52 rounded-t-xl relative ${width}`}>
          <Image alt={`${streamer.name}のアイコン`} src={streamer.icon_url} fill={true} />
        </div>
      ) : (
        <div className={`h-52 bg-game-gray-500 text-game-gray-300 ${width}`}></div>
      )}
      <div className='h-48 w-full rounded-b-xl bg-game-gray-700 p-5'>
        <p className='mb-4 text-xl font-bold text-game-white'>{streamer.name}</p>
        <p className='mb-6 line-clamp-3 text-xs text-game-gray-300'>{streamer.profile}</p>
      </div>
    </Link>
  )
}
