import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const CommonButton = ({ children, ...props }: Props) => {
  return (
    <button
      className='px-4 py-2 rounded bg-game-pink text-game-black disabled:cursor-default disabled:opacity-50'
      {...props}
    >
      {children}
    </button>
  )
}

export default CommonButton
