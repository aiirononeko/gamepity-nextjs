import { DAYS_LABEL } from '@/app/streamers/[id]/reservation/constants'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Reservation } from '@/types/reservation'
import { tzDate } from '@formkit/tempo'

type Props = {
  reservations: Reservation[]
  oneWeekDateTimes: Date[]
}

export default function ReservationDateTimeTable({
  reservations,
  oneWeekDateTimes,
}: Props) {
  const hours = [...Array(24)].map((_, index) => (index + 9) % 24).slice(0, 20)

  return (
    <div className='w-[352px] md:w-full'>
      <div className='mb-2 flex flex-row items-center space-x-2'>
        <div className='size-4 cursor-pointer bg-zinc-300 md:size-6'></div>
        <p>...予約あり</p>
      </div>
      <table className='md:w-full'>
        <thead>
          <tr>
            <th className='w-20 md:w-12'></th>
            {oneWeekDateTimes.map((dateTime) => (
              <th key={dateTime.toISOString()} className='w-28'>
                <span className='block'>{DAYS_LABEL[dateTime.getDay()]}</span>
                <p className='md:text-2xl'>{dateTime.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <th className='h-10 text-left md:h-14'>{`${hour}:00`}</th>
              {oneWeekDateTimes.map((day, i) => {
                const matchingReservations = reservations.filter(
                  (reservation) => {
                    const jstStartDateTime = tzDate(
                      reservation.start_date_dime,
                      'Asia/Tokyo',
                    )
                    return (
                      jstStartDateTime.getDate() ===
                        tzDate(day, 'Asia/Tokyo').getDate() &&
                      jstStartDateTime.getHours() === hour
                    )
                  },
                )
                return (
                  <td
                    key={`${i}_${day.toISOString()}`}
                    className='border border-solid'
                  >
                    {matchingReservations.map((reservation) => (
                      <>
                        <Dialog key={reservation.id}>
                          <DialogTrigger>
                            <div className='block h-10 cursor-pointer bg-zinc-300 hover:bg-zinc-400 md:m-0 md:h-14'></div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
