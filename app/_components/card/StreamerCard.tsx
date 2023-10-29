import Link from 'next/link'

export default function StreamerCard(data: any) {
  const { streamer } = data
  return (
    <Link href={`/users/${streamer.id}`}>
      <p>{streamer.name}</p>
    </Link>
  )
}
