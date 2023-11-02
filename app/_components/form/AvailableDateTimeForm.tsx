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
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            開始時刻
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            name='startDateTime'
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
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
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            予約可能日時を登録する
          </button>
        </div>
      </div>
    </form>
  )
}
