import Link from 'next/link'
import { Button } from './ui/button'
import type { Game } from '@/types/game'

type Props = {
  game: Game
}

export default function Game({ game }: Props) {
  return (
    <Link href={`/games/${game.id}`}>
      <Button variant='ghost'>{game.name}</Button>
    </Link>
  )
}
