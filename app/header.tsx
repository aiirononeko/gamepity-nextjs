import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Header() {
  return (
    <header className='flex h-20 items-center justify-center gap-2 border-b md:justify-between md:px-16'>
      <Button variant='ghost' className='text-2xl font-bold' asChild>
        <Link href='/'>Gamepity β</Link>
      </Button>

      {/* <span className='flex-1'></span> */}

      <Button variant='outline' asChild>
        <Link href='/signin'>ログイン</Link>
      </Button>
    </header>
  )
}
