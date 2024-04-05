import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className='rounded-full border-2 border-solid border-game-gray-300 bg-game-gray-500 px-4 py-2 text-game-white disabled:cursor-default disabled:opacity-50'
      {...props}
    >
      {children}
    </button>
  )
}
