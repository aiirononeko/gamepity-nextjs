import { LoaderIcon } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <LoaderIcon className='size-14 animate-spin' />
    </div>
  )
}
