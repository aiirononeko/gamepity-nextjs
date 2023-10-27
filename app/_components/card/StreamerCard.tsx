import Link from 'next/link'

export default function StreamerCard(streamer: any) {
  return (
    <Link href={`/users/${streamer.id}`}>
      <p>{streamer.name}</p>
    </Link>
  )
}
