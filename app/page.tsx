import StreamerCard from '@/components/StreamerCard'
import { Button } from '@/components/ui/button'
import { getGames } from '@/data/game'
import { getTopPageStreamers } from '@/data/streamer'
import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'トップ | Gamepity',
  description: 'トップページ',
}

export default async function Page() {
  const streamers = await getTopPageStreamers()
  const games = await getGames()

  return (
    <div className='mb-16 flex flex-col items-center'>
      <div className='relative flex h-[220px] w-full flex-col items-center justify-center md:mb-8 md:justify-center'>
        <div>
          <p
            className='relative -top-12 text-8xl text-background md:-top-0 md:text-[240px] md:tracking-[28px]'
            style={{
              WebkitTextStrokeWidth: '2px',
              WebkitTextStrokeColor: 'rgb(30, 41, 59)',
              WebkitTextFillColor: 'rgb(2, 8, 23)',
              paintOrder: 'stroke fill',
              fontWeight: 'bold',
            }}
          >
            Gamepity
          </p>
        </div>
        <div className='absolute top-16 flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-6xl font-semibold tracking-wider md:text-8xl'>
            Gamepity
          </h1>
          <p className='text-lg font-semibold tracking-wider text-accent md:text-2xl'>
            For All Gamers Platform
          </p>
        </div>
      </div>
      <div className='space-y-8 md:mx-[160px] md:space-y-12'>
        <div className='space-y-4'>
          <div className='flex flex-col items-center space-y-2 md:grid md:flex-none md:grid-cols-12'>
            <div className='space-y-2 md:col-span-8'>
              <h2 className='text-center text-xl font-bold md:text-start'>
                注目ストリーマー
              </h2>
              <p className='text-center text-xs md:text-start'>
                注目のストリーマーと一緒にゲームを楽しもう！
              </p>
            </div>
            <Button
              variant='link'
              asChild
              className='md:col-span-2 md:col-start-11 md:p-0'
            >
              <Link href='/streamers' className='decoration-accent'>
                すべてのストリーマーをみる
                <ChevronRight className='size-4' />
              </Link>
            </Button>
          </div>
          <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
            {streamers.map((streamer) => (
              <StreamerCard key={streamer.id} streamer={streamer} />
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex flex-col items-center space-y-2 md:grid md:flex-none md:grid-cols-12'>
            <div className='space-y-2 md:col-span-8'>
              <h2 className='text-center text-xl font-bold md:text-start'>
                注目ゲームタイトル
              </h2>
              <p className='text-center text-xs md:text-start'>
                注目のゲームタイトルからストリーマーを探そう！
              </p>
            </div>
            <Button
              variant='link'
              asChild
              className='md:col-span-2 md:col-start-11 md:p-0'
            >
              <Link href='/games' className='decoration-accent'>
                すべてのタイトルをみる
                <ChevronRight className='size-4' />
              </Link>
            </Button>
          </div>
          <div className='grid gap-4 md:grid-cols-4'>
            {games.map((game) => (
              <Button
                key={game.id}
                variant='outline'
                asChild
                className='md:col-auto md:w-[260px]'
              >
                <Link href={`/games/${game.id}`}>{game.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
