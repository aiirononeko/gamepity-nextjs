import StreamerCard from '@/components/StreamerCard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getGame } from '@/data/game'
import { getStreamersWithGameTitle } from '@/data/streamer'
import Link from 'next/link'

export const generateMetadata = async ({
  params,
}: {
  params: { id: string }
}) => {
  const game = await getGame(Number(params.id))
  return {
    title: `${game.name}のページ | Gamepity`,
    descripton: `${game.name}のページ`,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = await getGame(Number(params.id))
  const streamers = await getStreamersWithGameTitle(game.id)

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
            <BreadcrumbPage>{game.name}を募集中のストリーマー</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className='text-xl font-bold'>{game.name}を募集中のストリーマー</h2>
      {streamers.length > 0 ? (
        <div className='grid gap-8 md:grid-cols-3 md:gap-12'>
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      ) : (
        <p className='w-80'>{game.name}を募集中のストリーマーはいません</p>
      )}
    </div>
  )
}
