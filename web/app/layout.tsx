import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Voidcast',
  description: 'Programmable blackhole proxy and honeypot toolkit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-space-black text-gray-200 selection:bg-white selection:text-black min-h-screen relative`}>
        <div className="fixed inset-0 bg-stars opacity-30 pointer-events-none z-0"></div>
        <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
