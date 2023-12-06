import { type Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'

import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Layout } from '@/components/Layout'
import { AuthContextProvider } from '@/lib/auth'
import { Toaster } from '@/components/ui/Toaster'
import { MarketBountyMemoryContextProvider } from '@/lib/marketBountyMemory'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Manifold Bounties',
    default: 'Manifold Bounties - Build Manifold Together',
  },
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('h-full bg-white antialiased', inter.variable)}>
      <body className="flex min-h-full">
        <div className="flex w-full flex-col">
          <AuthContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <MarketBountyMemoryContextProvider>
                <Layout>{children}</Layout>
              </MarketBountyMemoryContextProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </div>

        <Toaster />
      </body>
    </html>
  )
}
