import Streamer from '@/components/Streamer'
import { getGame } from '@/data/game'
import { getStreamersWithGameId } from '@/data/streamer'

export default async function Page({ params }: { params: { id: string } }) {
  const game = await getGame(Number(params.id))
  const streamers = await getStreamersWithGameId(Number(params.id))

  return (
    <>
      <div className='container mx-auto mt-12'>
        <h2 className='text-game-white m-10 text-center text-xl font-bold'>
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
