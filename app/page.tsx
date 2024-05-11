import Link from 'next/link'
import Game from '@/components/Game'
import { GradationButton } from '@/components/GradationButton'
import Streamer from '@/components/Streamer'
import { getGames } from '@/data/game'
import { getStreamers } from '@/data/streamer'

export default async function Home() {
  // // TODO: 全件検索ではなく、注目ストリーマーと最新ストリーマー10件ずつ取得するよう修正する
  const streamers = await getStreamers()
  const games = await getGames()

  return (
    <>
      <div className='mb-12 flex flex-col items-center bg-gradient-to-r from-[#F0DA53] via-[#EA5E7F] to-[#3D7CEA] pb-8 pt-10'>
        <p className='text-game-white mb-5 text-center text-xl font-bold'>
          憧れのストリーマーとゲームができる
          <br />
          ゲーマー向けマッチングプラットフォーム
        </p>
        <p className='text-game-white mb-10 text-center text-7xl font-bold'>Gamepity</p>
        <div className='flex w-full justify-center'>
          <Link href='/users/signup'>
            <GradationButton>新規登録はこちら</GradationButton>
          </Link>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='md:grid md:grid-cols-6'>
          <div className='md:col-span-3'>
            <h2 className='text-game-white mb-1 text-xl font-bold'>注目ストリーマー</h2>
            <p className='text-game-gray-300 mb-2 text-xs'>
              注目のストリーマーと一緒にゲームを楽しもう！
            </p>
          </div>
          <div className='text-game-white mb-6 underline md:col-span-3 md:mt-3 md:text-end'>
            <Link href='/streamers'>すべてのストリーマーをみる →</Link>
          </div>
        </div>
        <div className='flex flex-nowrap space-x-6 overflow-y-auto md:py-3'>
          {streamers.map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} width={'w-80'} />
          ))}
        </div>
        <div className='mt-10 grid grid-cols-5'>
          <div className='col-span-4'>
            <h2 className='text-game-white mb-1 text-xl font-bold'>注目ゲームタイトル</h2>
            <p className='text-game-gray-300 mb-6 text-xs md:mb-4'>
              注目のゲームタイトルからストリーマーを探そう！
            </p>
          </div>
        </div>
        <div className='flex flex-row space-x-4 overflow-y-auto md:h-20 md:pt-3'>
          {games.map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </div>
        <div className='mt-10 md:grid md:grid-cols-6'>
          <div className='md:col-span-3'>
            <h2 className='text-game-white mb-1 text-xl font-bold'>
              すべてのストリーマー
            </h2>
            <p className='text-game-gray-300 mb-2 text-xs md:mb-6'>
              お気に入りのストリーマーを見つけよう！
            </p>
          </div>
          <div className='text-game-white mb-6 underline md:col-span-3 md:mt-3 md:text-end'>
            <Link href='/streamers'>すべてのストリーマーをみる →</Link>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-6'>
          {streamers.slice(0, 8).map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} width={'w-full'} />
          ))}
        </div>
      </div>
    </>
  )
}
