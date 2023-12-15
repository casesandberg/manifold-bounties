import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Layout } from '@/components/Layout'
import { Toaster } from '@/components/ui/Toaster'
import { MarketBountyMemoryContextProvider } from '@/lib/marketBountyMemory'
import { Analytics } from '@vercel/analytics/react'
import SessionProvider from '@/lib/session'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={clsx('h-full bg-white antialiased', inter.variable)} suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className="flex min-h-full">
        <div className="flex w-full flex-col">
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <MarketBountyMemoryContextProvider>
                <Layout>{children}</Layout>
              </MarketBountyMemoryContextProvider>
            </ThemeProvider>
          </SessionProvider>
        </div>

        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
