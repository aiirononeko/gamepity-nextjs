'use client'

export default function Footer() {
  return (
    <footer className='flex flex-col items-center space-y-2 py-10'>
      <div className='space-x-6'>
        <a
          href='https://www.notion.so/9f18b38032884fe8915c7addad0e7f0e?pvs=4'
          target='_blank'
          className='text-xs text-game-gray-500 hover:text-blue-700'
        >
          利用規約
        </a>
        <a
          href='https://www.notion.so/116df216216d478d9ab909e53d6475a9?pvs=4'
          target='_blank'
          className='text-xs text-game-gray-500 hover:text-blue-700'
        >
          プライバシーポリシー
        </a>
        <a
          href='https://brash-ferry-996.notion.site/7e76538f95c642c7b3ce1292b5ba0ff6'
          target='_blank'
          className='text-xs text-game-gray-500 hover:text-blue-700'
        >
          特定商取引法に基づく表記
        </a>
      </div>
      <p className='text-xs text-game-gray-500'>
        &copy;2024 Gamepity. All rights reserved.
      </p>
    </footer>
  )
}
