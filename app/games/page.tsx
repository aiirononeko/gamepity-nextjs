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
import Link from 'next/link'

export default async function Page() {
  const games = await getGames()

  return (
    <div className='mb-16 mt-8 flex flex-col items-center space-y-6 md:mx-[160px] md:mt-10 md:items-start'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>トップ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>すべてのゲームタイトル</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>すべてのゲームタイトル</h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-8'>
        {games.map((game) => (
          <Button key={game.id} variant='outline' asChild className='col-auto'>
            <Link href={`/games/${game.id}`}>{game.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
