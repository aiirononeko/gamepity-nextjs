export default function Loading() {
  return (
    <div className='mt-auto flex justify-center' aria-label='読み込み中'>
      <div className='size-10 animate-spin rounded-full border-4 border-game-white border-t-transparent'></div>
    </div>
  )
}
