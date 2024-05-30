import Footer from '@/app/footer'
import '@/app/globals.css'
import Header from '@/app/header'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Gamepity',
  description:
    'ストリーマーと一緒にゲームが遊べる、ゲーマー向けマッチングプラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
