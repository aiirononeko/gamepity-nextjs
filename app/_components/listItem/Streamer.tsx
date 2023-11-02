import Link from 'next/link'

export default function Streamer(data: any) {
  const { streamer } = data
  return (
    <Link href={`/streamers/${streamer.id}`}>
      <p>{streamer.name}</p>
    </Link>
  )
}
