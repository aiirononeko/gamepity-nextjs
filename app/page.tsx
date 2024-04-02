import Link from 'next/link'
import GameCard from '@/app/components/listItem/GameCard'
import StreamerCard from '@/app/components/listItem/StreamerCard'
import { getGames } from '@/app/data/game'
import { getStreamers } from '@/app/data/streamer'

export default async function Home() {
  const streamers = await getStreamers()
  const games = await getGames()

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
      <div className='mx-16'>
        <div className='grid grid-cols-5'>
          <div className='col-span-4'>
            <h2 className='text-xl font-bold text-game-white'>注目ストリーマー</h2>
            <p className='mb-5 text-xs text-game-gray-300'>
              注目のストリーマーと一緒にゲームを楽しもう！
            </p>
          </div>
          <Link
            href='/streamers'
            className='col-span-1 pt-3 text-end text-game-white underline'
          >
            すべてのストリーマーをみる →
          </Link>
        </div>
        <div className='flex flex-row space-x-6 overflow-x-auto'>
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
        <div className='mt-10 grid grid-cols-5'>
          <div className='col-span-4'>
            <h2 className='text-xl font-bold text-game-white'>注目ゲームタイトル</h2>
            <p className='mb-5 text-xs text-game-gray-300'>
              注目のゲームタイトルからストリーマーを探そう！
            </p>
          </div>
          <Link href='/games' className='col-span-1 pt-3 text-end text-game-white underline'>
            すべてのゲームタイトルをみる →
          </Link>
        </div>
        <div className='flex flex-row space-x-8 overflow-x-auto'>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className='mt-10 grid grid-cols-5'>
          <div className='col-span-4'>
            <h2 className='text-xl font-bold text-game-white'>すべてのストリーマー</h2>
            <p className='mb-5 text-xs text-game-gray-300'>
              お気に入りのストリーマーを見つけよう！
            </p>
          </div>
          <Link
            href='/streamers'
            className='col-span-1 pt-3 text-end text-game-white underline'
          >
            すべてのストリーマーをみる →
          </Link>
        </div>
        <div className='grid grid-cols-5 gap-6'>
          {streamers.slice(0, 10).map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      </div>
    </>
  )
}
