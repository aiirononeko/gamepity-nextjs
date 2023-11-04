import { User } from '@prisma/client'
import Link from 'next/link'

type Props = {
  streamer: User
}

export default function Streamer(data: Props) {
  const { streamer } = data

  return (
    <Link href={`/streamers/${streamer.id}`}>
      <p>{streamer.name}</p>
    </Link>
  )
}
