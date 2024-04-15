import Image from 'next/image'
import Streamer from '@/components/Streamer'
import { getGame } from '@/data/game'
import { getStreamersWithGameId } from '@/data/streamer'

export default async function Page({ params }: { params: { id: string } }) {
  const game = await getGame(Number(params.id))
  const streamers = await getStreamersWithGameId(Number(params.id))

  return (
    <>
      <div className='container mx-auto mt-10'>
        {game.icon_url ? (
          <Image alt={`${game.name}のアイコン`} src={game.icon_url} />
        ) : (
          <div className='mx-auto mb-6 h-64 w-1/2 bg-game-gray-600'></div>
        )}
      </div>
      <div className='container mx-auto'>
        <h2 className='m-10 text-center text-xl font-bold text-game-white'>
          {`${game.name}を募集中のストリーマー`}
        </h2>
        <div className='grid grid-cols-4 gap-6'>
          {streamers.map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} width={'w-full'} />
          ))}
        </div>
      </div>
    </>
  )
}
