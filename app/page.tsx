import { fetchStreamers } from '@/app/_services/streamerService'
import StreamerCard from '@/app/_components/card/StreamerCard'

export default async function Home() {
  const streamers = await fetchStreamers()

  return (
    <>
      <p>トップページ</p>
      {streamers.length === 0 ? (
        <p>ストリーマーがいません</p>
      ) : (
        <>
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </>
      )}
    </>
  )
}
