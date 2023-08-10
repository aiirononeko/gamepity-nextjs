import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const OutlinedButton = ({ children, ...props }: Props) => {
  return (
    <button
      className='px-4 py-2 rounded bg-game-black text-game-pink border border-game-pink disabled:cursor-default disabled:opacity-50'
      {...props}
    >
      {children}
    </button>
  )
}

export default OutlinedButton
