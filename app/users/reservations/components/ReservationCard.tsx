import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getPlan } from '@/data/plan'
import { getStreamer } from '@/data/streamer'
import { getUser } from '@/data/user'
import type { Reservation } from '@/types/reservation'
import { addHour, date, format } from '@formkit/tempo'
import { ReviewForm } from './ReviewForm'

type Props = {
  reservation: Reservation
  completed?: boolean
}

export const ReservationCard = async ({
  reservation,
  completed = false,
}: Props) => {
  const user = await getUser(reservation.user_id)
  const streamer = await getStreamer(reservation.streamer_id)
  const plan = await getPlan(reservation.plan_id)

  const startDateTime = format({
    date: date(reservation.start_date_dime),
    format: 'YYYY-MM-DD HH:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  const endDateTime = format({
    date: addHour(date(reservation.start_date_dime), 1),
    format: 'YYYY-MM-DD HH:mm',
    locale: 'ja',
    tz: 'Asia/Tokyo',
  })

  return (
    <Card className='w-[350px]'>
      <CardHeader className='space-y-3'>
        <CardTitle>{streamer.name}</CardTitle>
        <CardDescription>
          {startDateTime} ~ {endDateTime}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='font-semibold'>{plan.name}</p>
        <p>{streamer.discord_url}</p>
      </CardContent>
      {completed && (
        <CardFooter>
          {!reservation.review_id ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button>レビューする</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader className='space-y-3'>
                  <DialogTitle>ストリーマーをレビューしよう</DialogTitle>
                  <DialogDescription>
                    {streamer.name} / {plan.name}
                  </DialogDescription>
                </DialogHeader>
                <ReviewForm
                  userId={user.id}
                  userName={user.name}
                  streamerId={streamer.id}
                  streamerEmail={streamer.email}
                  planId={reservation.plan_id}
                  reservationId={reservation.id}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <p>レビューしました</p>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
