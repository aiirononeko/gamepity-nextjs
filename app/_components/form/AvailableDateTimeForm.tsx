import {
  createAvailableDateTime,
  updateAvailableDateTime,
} from '@/app/_services/availableDateTimeService'

const createAction = async (formData: FormData) => {
  'use server'

  const startDateTime = formData.get('startDateTime')
  const userId = formData.get('userId')

  if (startDateTime && userId) {
    await createAvailableDateTime({
      startDateTime: new Date(startDateTime.toString()),
      userId: Number(userId),
    })
  }
}

const updateAction = async (formData: FormData) => {
  'use server'

  const id = formData.get('id')
  const startDateTime = formData.get('startDateTime')

  if (id && startDateTime) {
    await updateAvailableDateTime({
      id: Number(id),
      startDateTime: new Date(startDateTime.toString()),
    })
  }
}

type Props = {
  isNew: boolean
  userId: number
}

export default function AvailableDateTimeForm(props: Props) {
  const { isNew, userId } = props

  return (
    <form className='w-full max-w-sm' action={isNew ? createAction : updateAction}>
      <div className='mb-6 md:flex md:items-center'>
        <div className='md:w-1/3'>
          <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>
            開始時刻
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='startDateTime'
            className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='2023/11/2 10:00:00'
          />
        </div>
      </div>
      <input name='userId' hidden type='number' defaultValue={userId} />
      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className='focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none'
            type='submit'
          >
            予約可能日時を登録する
          </button>
        </div>
      </div>
    </form>
  )
}
