import Streamer from '@/app/_components/listItem/Streamer'
import { fetchStreamers } from '@/app/_services/streamerService'

export default async function Home() {
  const streamers = await fetchStreamers()

  return (
    <>
      {!streamers || streamers.length === 0 ? (
        <p>ストリーマーがいません</p>
      ) : (
        <>
          {streamers.map((streamer) => (
            <Streamer key={streamer.id} streamer={streamer} />
          ))}
        </>
      )}
    </>
  )
}
