import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const CommonButton = ({ children, ...props }: Props) => {
  return (
    <button
      className='px-4 py-2 rounded-full bg-game-gray-500 text-game-white border-solid border-2 border-color-game-graty-300 disabled:cursor-default disabled:opacity-50'
      {...props}
    >
      {children}
    </button>
  )
}

export default CommonButton
