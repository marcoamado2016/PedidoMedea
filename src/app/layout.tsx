import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth  Next App',
  description: 'Sistema de autenticacion',
}
interface RoootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RoootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='min-h-screen flex flex-col items-center justify-center'>{children}</main>
      </body>
    </html>
  )
}
