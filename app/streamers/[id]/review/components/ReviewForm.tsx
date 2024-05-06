'use client'

import { useState } from 'react'
import { createReview } from '@/actions/review'
import { GradationButton } from '@/components/GradationButton'
import { createReviewSchema } from '@/schemas/review'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'

type Props = {
  userId: string
  streamerId: string
  planId: number
}

export function ReviewForm({ userId, streamerId, planId }: Props) {
  const [lastResult, action] = useFormState(createReview, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createReviewSchema })
    },
    shouldValidate: 'onBlur',
  })

  const [rating, setRating] = useState<number>(3)

  const handleChangeRating = (selectRating: number) => {
    setRating(selectRating)
  }

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
      action={action}
      className='flex flex-col items-center space-y-8'
    >
      <div className='flex items-center'>
        <svg
          onClick={() => handleChangeRating(1)}
          className='ms-1 size-8 text-yellow-300 hover:-translate-y-1'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 22 20'
        >
          <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
        </svg>
        {rating >= 2 ? (
          <svg
            onClick={() => handleChangeRating(2)}
            className='ms-1 size-8 text-yellow-300 hover:-translate-y-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        ) : (
          <svg
            onClick={() => handleChangeRating(2)}
            className='ms-1 size-8 text-gray-300 hover:-translate-y-1 dark:text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        )}
        {rating >= 3 ? (
          <svg
            onClick={() => handleChangeRating(3)}
            className='ms-1 size-8 text-yellow-300 hover:-translate-y-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        ) : (
          <svg
            onClick={() => handleChangeRating(3)}
            className='ms-1 size-8 text-gray-300 hover:-translate-y-1 dark:text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        )}
        {rating >= 4 ? (
          <svg
            onClick={() => handleChangeRating(4)}
            className='ms-1 size-8 text-yellow-300 hover:-translate-y-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        ) : (
          <svg
            onClick={() => handleChangeRating(4)}
            className='ms-1 size-8 text-gray-300 hover:-translate-y-1 dark:text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        )}
        {rating >= 5 ? (
          <svg
            onClick={() => handleChangeRating(5)}
            className='ms-1 size-8 text-yellow-300 hover:-translate-y-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        ) : (
          <svg
            onClick={() => handleChangeRating(5)}
            className='ms-1 size-8 text-gray-300 hover:-translate-y-1 dark:text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 22 20'
          >
            <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
          </svg>
        )}
        <input hidden value={rating} name={fields.rating.name} readOnly />
      </div>
      <div>
        <textarea
          name={fields.comment.name}
          rows={4}
          className='block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='一緒に遊んだ感想を記入してください'
        />
        <span className='mt-1 text-red-500'>{fields.comment.errors}</span>
      </div>
      <input name={fields.planId.name} value={planId} hidden readOnly />
      <input name={fields.userId.name} value={userId} hidden readOnly />
      <input name={fields.streamerId.name} value={streamerId} hidden readOnly />
      <GradationButton type='submit'>レビューを送信</GradationButton>
    </form>
  )
}
