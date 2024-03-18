import Link from 'next/link'

export default async function Home() {
  return (
    <>
      <div className='flex flex-col pt-10 pb-5 mb-8 items-center bg-gradient-to-r from-[#F0DA53] via-[#EA5E7F] to-[#3D7CEA]'>
        <p className='text-game-white text-center font-bold text-xl mb-5'>
          憧れのストリーマーとゲームができる
          <br />
          ゲーマー向けマッチングプラットフォーム
        </p>
        <p className='text-game-white text-center font-bold text-7xl mb-8'>Gamepity</p>
        <div className='flex justify-center w-full'>
          <Link href='/'>
            <button className='border-solid border-2 border-game-white rounded py-3 px-8 bg-gradient-to-r from-[#FFB13C] to-[#EF3CFF] text-game-white'>
              新規登録はこちら
            </button>
          </Link>
        </div>
      </div>
      <div className='container mx-8'>
        <h2 className='text-game-white font-bold text-xl'>注目ストリーマー</h2>
        <p className='text-game-gray-300 text-xs'>
          注目のストリーマーと一緒にゲームを楽しもう！
        </p>
      </div>
    </>
  )
}
