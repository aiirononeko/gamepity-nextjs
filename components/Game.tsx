import Image from 'next/image'
import Link from 'next/link'
import { Database } from '@/supabase/schema'

type Props = {
  game: Database['public']['Tables']['games']['Row']
}

export default function Game({ game }: Props) {
  return (
    <div>
      <Link href={`/games/${game.id}`}>
        <div className='w-40 h-10 rounded-full bg-game-gray-600 flex items-center justify-center'>
          <p className='text-game-white'>{game.name}</p>
        </div>
      </Link>
    </div>
  )
}
