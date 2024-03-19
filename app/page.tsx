import Link from 'next/link'
import { fetchStreamers } from './_services/streamerService'
import { User } from '@prisma/client'
import StreamerCard from './_components/listItem/StreamerCard'

async function getStreamers() {
  const streamers: User[] = await fetchStreamers()
  return streamers
}

export default async function Home() {
  const streamers = await getStreamers()

  return (
    <>
      <div className='mb-10 flex flex-col items-center bg-gradient-to-r from-[#F0DA53] via-[#EA5E7F] to-[#3D7CEA] pb-5 pt-10'>
        <p className='mb-5 text-center text-xl font-bold text-game-white'>
          憧れのストリーマーとゲームができる
          <br />
          ゲーマー向けマッチングプラットフォーム
        </p>
        <p className='mb-8 text-center text-7xl font-bold text-game-white'>Gamepity</p>
        <div className='flex w-full justify-center'>
          <Link href='/'>
            <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'>
              新規登録はこちら
            </button>
          </Link>
        </div>
      </div>
      <div className='container mx-auto'>
        <h2 className='text-xl font-bold text-game-white'>注目ストリーマー</h2>
        <p className='mb-5 text-xs text-game-gray-300'>
          注目のストリーマーと一緒にゲームを楽しもう！
        </p>
        <div className='flex flex-row space-x-6 overflow-x-auto'>
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      </div>
    </>
  )
}
