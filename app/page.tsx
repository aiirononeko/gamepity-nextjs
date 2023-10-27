import { fetchStreamers } from '@/app/_hooks/useUser'
import StreamerCard from './_components/card/StreamerCard'

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
