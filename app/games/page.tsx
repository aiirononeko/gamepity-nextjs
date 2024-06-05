import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { getGames } from '@/data/game'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'すべてのゲームタイトル | Gamepity',
  description: 'ゲームタイトル一覧ページ',
}

export default async function Page() {
  const games = await getGames()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>トップ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>すべてのゲームタイトル</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>すべてのゲームタイトル</h2>
      <div className='grid gap-4 md:grid-cols-4'>
        {games.map((game) => (
          <Button
            key={game.id}
            variant='outline'
            asChild
            className='w-72 md:col-auto md:w-[260px]'
          >
            <Link href={`/games/${game.id}`}>{game.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
