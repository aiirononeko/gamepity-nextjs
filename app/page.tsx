import Link from 'next/link'
import Game from '@/components/Game'
import Streamer from '@/components/Streamer'
import { Button } from '@/components/ui/button'
import { getGames } from '@/data/game'
import { getStreamers } from '@/data/streamer'

export default async function Page() {
  const streamers = await getStreamers()
  const games = await getGames()

  return (
    <>
      <div className='primary-gradient mb-12 flex flex-col items-center pb-8 pt-10'>
        <p className='mb-5 text-center text-xl font-bold text-primary-foreground'>
          憧れのストリーマーとゲームができる
          <br />
          ゲーマー向けマッチングプラットフォーム
        </p>
        <p className='mb-10 text-center text-7xl font-bold text-primary-foreground'>
          Gamepity
        </p>
        <div className='flex w-full justify-center'>
          <Link href='/users/signup'>
            <Button
              variant='outline'
              className='primary-gradient h-12 w-48 text-primary-foreground hover:-translate-y-1 hover:text-primary-foreground'
            >
              新規登録はこちら
            </Button>
          </Link>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='md:grid md:grid-cols-6'>
          <div className='md:col-span-3'>
            <h2 className='mb-1 text-xl font-bold text-primary-foreground'>
              注目ストリーマー
            </h2>
            <p className='mb-2 text-xs text-secondary-foreground'>
              注目のストリーマーと一緒にゲームを楽しもう！
            </p>
          </div>
          <div className='mb-6 text-primary-foreground underline md:col-span-3 md:mt-3 md:text-end'>
            <Link href='/streamers'>すべてのストリーマーをみる →</Link>
          </div>
        </div>
        <div className='flex flex-nowrap space-x-8 overflow-y-auto md:py-3'>
          {streamers.map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} width={'w-80'} />
          ))}
        </div>
        <div className='mt-10 grid grid-cols-5'>
          <div className='col-span-4'>
            <h2 className='mb-1 text-xl font-bold text-primary-foreground'>
              注目ゲームタイトル
            </h2>
            <p className='mb-6 text-xs text-secondary-foreground md:mb-4'>
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
            <h2 className='mb-1 text-xl font-bold text-primary-foreground'>
              すべてのストリーマー
            </h2>
            <p className='mb-2 text-xs text-secondary-foreground md:mb-6'>
              お気に入りのストリーマーを見つけよう！
            </p>
          </div>
          <div className='mb-6 text-primary-foreground underline md:col-span-3 md:mt-3 md:text-end'>
            <Link href='/streamers'>すべてのストリーマーをみる →</Link>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8'>
          {streamers.slice(0, 8).map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} width={'w-full'} />
          ))}
        </div>
      </div>
    </>
  )
}
