import Image from 'next/image'
import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  game: Database['public']['Tables']['games']['Row']
  size: string
}

export default function Game({ game, size }: Props) {
  return (
    <div>
      <Link href={`/games/${game.id}`}>
        {game.icon_url ? (
          <Image alt={`${game.name}のアイコン`} src={game.icon_url} className='size-44' />
        ) : (
          <div className={`rounded-xl bg-game-gray-600 ${size}`}></div>
        )}
      </Link>
    </div>
  )
}
