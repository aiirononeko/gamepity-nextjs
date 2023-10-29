import '@/app/globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Header from '@/app/header'
import Footer from '@/app/footer'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gamepity',
  description:
    'ストリーマーと一緒にゲームが遊べる、ゲーマー向けマッチングプラットフォーム',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className={playfairDisplay.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
