import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Header() {
  return (
    <header className='flex h-20 items-center justify-center gap-2 border-b md:justify-between md:px-[330px]'>
      <Link href='/' className='text-2xl font-bold'>
        Gamepity β
      </Link>

      {/* <span className='flex-1'></span> */}

      <Button variant='outline' asChild>
        <Link href='/signin'>ログイン</Link>
      </Button>
    </header>
  )
}
