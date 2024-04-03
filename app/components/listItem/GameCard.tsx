import { Database } from '@/supabase/schema'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  game: Database['public']['Tables']['games']['Row']
}

export default function GameCard(data: Props) {
  const { game } = data

  return (
    <div>
      {game.icon_url ? (
        <Link href='/'>
          <Image
            alt={`${game.name}のアイコン`}
            src={game.icon_url}
            width={250}
            height={200}
          />
        </Link>
      ) : (
        <div className='size-44 rounded-xl bg-game-gray-500 text-game-gray-300'></div>
      )}
    </div>
  )
}
