import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Plan } from '@/types/plan'
import Link from 'next/link'

type Props = {
  plan: Plan
}

export default function PlanCard({ plan }: Props) {
  // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
  const gameNames = plan.plans_games.map(
    // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
    (plans_game) => plans_game.game_id.name,
  )

  return (
    <Card className='w-[350px] transition duration-300 hover:-translate-y-3'>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{gameNames.join(', ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4 whitespace-pre-wrap'>{plan.description}</p>
        <p className='font-semibold'>{`${plan.amount}円 / 60分`}</p>
      </CardContent>
      <CardFooter>
        <Button variant='default' asChild>
          <Link
            href={`/streamers/${plan.streamer_id}/reservation/?planId=${plan.id}`}
          >
            このプランで予約する
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
