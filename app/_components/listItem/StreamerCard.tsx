import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  streamer: User
}

export default function StreamerCard(data: Props) {
  const { streamer } = data

  return (
    <Link href={`/streamers/${streamer.id}`} className='mb-10'>
      {streamer.iconUrl !== '' ? (
        <Image
          alt={`${streamer.name}のアイコン`}
          src={streamer.iconUrl}
          width={250}
          height={200}
        />
      ) : (
        <div className='bg-game-gray-500 text-game-gray-300 rounded-t-xl h-52 w-96'></div>
      )}

      <div className='bg-game-gray-700 rounded-b-xl p-6 h-48 w-96'>
        <p className='text-game-white text-2xl font-bold mb-4'>{streamer.name}</p>
        <p className='text-game-gray-300 text-xs mb-6 line-clamp-3'>{streamer.profile}</p>
        <div className='flex justify-center w-full'>
          <Link href='/'>
            <button className='border-solid border-2 border-game-white rounded py-1 px-2 bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] text-game-white text-xs'>
              詳細はこちら
            </button>
          </Link>
        </div>
      </div>
    </Link>
  )
}
