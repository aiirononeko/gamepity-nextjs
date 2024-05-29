import Link from 'next/link'
import Game from '@/components/Game'
import Streamer from '@/components/Streamer'
import { Button } from '@/components/ui/button'
import { getGames } from '@/data/game'
import { getStreamers } from '@/data/streamer'
import { ChevronRight } from 'lucide-react'

export default async function Page() {
  const streamers = await getStreamers()
  const games = await getGames()

  return (
    <>
      <div className='mb-10 flex flex-col items-center bg-gradient-to-r from-[#F0DA53] via-[#EA5E7F] to-[#3D7CEA] py-12'>
        <p className='mb-5 text-center text-xl font-bold'>
          憧れのストリーマーとゲームができる
          <br />
          ゲーマー向けマッチングプラットフォーム
        </p>
        <p className='mb-10 text-center text-7xl font-bold'>Gamepity</p>
        <div className='flex w-full justify-center'>
          <Link href='/users/signup'>
            <Button variant='default' className='h-12 w-48 hover:-translate-y-1'>
              新規登録はこちら
            </Button>
          </Link>
        </div>
      </div>
      <div className='container mx-auto space-y-12'>
        <div>
          <div className='md:grid md:grid-cols-6'>
            <div className='md:col-span-3'>
              <h2 className='mb-1 text-xl font-bold'>注目ストリーマー</h2>
              <p className='mb-2 text-xs'>注目のストリーマーと一緒にゲームを楽しもう！</p>
            </div>
            <div className='md:col-span-3 md:mt-3 md:text-end'>
              <Link href='/streamers'>
                <Button variant='link'>
                  すべてのストリーマーをみる
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>
          <div className='flex h-[440px] flex-nowrap space-x-6 overflow-x-scroll md:pt-4'>
            {streamers.map((streamer) => (
              <Streamer key={streamer.id} streamer={streamer} />
            ))}
          </div>
        </div>
        <div>
          <div className='grid grid-cols-5'>
            <div className='col-span-4'>
              <h2 className='mb-1 text-xl font-bold'>注目ゲームタイトル</h2>
              <p className='mb-6 text-xs md:mb-4'>
                注目のゲームタイトルからストリーマーを探そう！
              </p>
            </div>
          </div>
          <div className='flex flex-row space-x-4 overflow-y-auto md:h-[60px]'>
            {games.map((game) => (
              <Game key={game.id} game={game} />
            ))}
          </div>
        </div>

        <div>
          <div className='md:grid md:grid-cols-6'>
            <div className='md:col-span-3'>
              <h2 className='mb-1 text-xl font-bold'>すべてのストリーマー</h2>
              <p className='mb-2 text-xs'>お気に入りのストリーマーを見つけよう！</p>
            </div>
            <div className='md:col-span-3 md:mt-3 md:text-end'>
              <Link href='/streamers'>
                <Button variant='link'>
                  すべてのストリーマーをみる
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>
          <div className='flex h-[440px] flex-nowrap space-x-6 overflow-x-scroll md:pt-4'>
            {streamers.map((streamer) => (
              <Streamer key={streamer.id} streamer={streamer} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
