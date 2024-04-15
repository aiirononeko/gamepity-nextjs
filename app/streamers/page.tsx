import Streamer from '@/components/Streamer'
import { getStreamers } from '@/data/streamer'

export default async function Page() {
  const streamers = await getStreamers()

  return (
    <div className='container mx-auto'>
      <h2 className='m-12 text-center text-xl font-bold text-game-white'>
        すべてのストリーマー
      </h2>
      <div className='grid grid-cols-4 gap-6'>
        {streamers.map((streamer) => (
          <Streamer key={streamer.id} streamer={streamer} width={'w-full'} />
        ))}
      </div>
    </div>
  )
}
