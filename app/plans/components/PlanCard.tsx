'use client'

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

type Props = {
  plan: Plan
}

export const PlanCard = ({ plan }: Props) => {
  // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
  const gameNames = plan.plans_games.map(
    // @ts-expect-error: Supabaseの型解決がうまくいかないのでignore
    (plans_game) => plans_game.game_id.name,
  )

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{gameNames.join(', ')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4 whitespace-pre-wrap'>{plan.description}</p>
        <p className='font-semibold'>{`${plan.amount}円 / 60分`}</p>
      </CardContent>
      <CardFooter className='flex flex-row items-start space-x-4'>
        <Button
          variant='destructive'
          onClick={() =>
            alert(
              '開発中のため、お手数ですが運営チームに削除依頼をお願いいたします。',
            )
          }
          className='w-40'
        >
          削除
        </Button>
      </CardFooter>
    </Card>
  )
}
