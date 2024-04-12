import Image from 'next/image'
import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  game: Database['public']['Tables']['games']['Row']
}

export default function GameCard(data: Props) {
  const { game } = data

  return (
    <div>
      {game.icon_url ? (
        <Link href='/'>
          <Image alt={`${game.name}のアイコン`} src={game.icon_url} className='size-44' />
        </Link>
      ) : (
        <div className='size-44 rounded-xl bg-game-gray-600'></div>
      )}
    </div>
  )
}
