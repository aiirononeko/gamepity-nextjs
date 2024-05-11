import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className='border-game-gray-300 bg-game-gray-500 text-game-white rounded-full border-2 border-solid px-4 py-2 disabled:cursor-default disabled:opacity-50'
      {...props}
    >
      {children}
    </button>
  )
}
