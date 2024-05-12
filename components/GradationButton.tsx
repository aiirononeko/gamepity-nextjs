type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function GradationButton({ children }: Props) {
  return (
    <button className='rounded border-2 border-solid border-game-white bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] px-8 py-3 text-game-white hover:-translate-y-1'>
      {children}
    </button>
  )
}
