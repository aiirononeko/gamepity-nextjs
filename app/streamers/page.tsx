import { getStreamers } from '@/data/streamer'
import StreamerCard from '@/app/streamers/components/StreamerCard'

export default async function Page() {
  const streamers = await getStreamers()

  return (
    <div className='container mx-auto'>
      <h2 className='m-10 text-center text-xl font-bold text-game-white'>
        すべてのストリーマー
      </h2>
      <div className='grid grid-cols-4 gap-6'>
        {streamers.map((streamer) => (
          <StreamerCard key={streamer.id} streamer={streamer} />
        ))}
      </div>
    </div>
  )
}
