'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function BreadCrumb({ children }: Props) {
  const router = useRouter()

  const back = () => {
    router.back()
  }

  return (
    <div className='mb-8 mt-12'>
      <button onClick={back} className='text-game-gray-300'>
        {children}
      </button>
    </div>
  )
}
