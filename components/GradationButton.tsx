type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function GradationButton({ children }: Props) {
  return (
    <button className='border-game-white text-game-white rounded border-2 border-solid bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 hover:-translate-y-1'>
      {children}
    </button>
  )
}
