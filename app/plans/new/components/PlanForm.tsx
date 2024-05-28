'use client'

import { createPlan } from '@/actions/plan'
import { planSchema } from '@/schemas/plan'
import { Game } from '@/types/game'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import Select from 'react-select'

type Props = {
  streamerId: string
  games: Game[]
}

export function PlanForm({ streamerId, games }: Props) {
  const [lastResult, action] = useFormState(createPlan, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: planSchema })
    },
    shouldValidate: 'onBlur',
  })

  const options = games.map((game) => ({
    label: game.name,
    value: game.id,
  }))

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className='w-full max-w-sm pt-10'
    >
      <div className='mb-6 flex flex-col'>
        <label
          htmlFor={fields.name.id}
          className='mb-1 block pr-4 text-left font-bold text-game-gray-500'
        >
          プラン名
        </label>
        <input
          name={fields.name.name}
          type='text'
          placeholder='ガチランクプラン'
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
        />
      </div>
      <div className='mb-6 flex flex-col'>
        <label
          htmlFor={fields.description.id}
          className='mb-1 block pr-4 text-left font-bold text-gray-500'
        >
          プラン説明
        </label>
        <textarea
          name={fields.description.name}
          placeholder='ガチでランク回しましょう！Apexダイヤランク以上推奨です。'
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
        />
      </div>
      <div className='mb-6 flex flex-col'>
        <label
          htmlFor={fields.amount.id}
          className='mb-1 block pr-4 text-left font-bold text-gray-500'
        >
          値段
        </label>
        <input
          name={fields.amount.name}
          type='number'
          placeholder='3000'
          className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
        />
      </div>
      <div className='mb-10 flex flex-col'>
        <label
          htmlFor={fields.gameIds.id}
          className='mb-1 block pr-4 text-left font-bold text-gray-500'
        >
          ゲームタイトル(複数選択可)
        </label>
        <Select
          options={options}
          name={fields.gameIds.name}
          isMulti={true}
          placeholder='選択してください'
        />
      </div>
      <input
        name={fields.streamerId.name}
        type='text'
        value={streamerId}
        hidden
        readOnly
      />
      <div className='md:flex md:items-center'>
        <button
          className='w-full rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white'
          type='submit'
        >
          プラン作成
        </button>
      </div>
    </form>
  )
}
