import type { Metadata } from 'next'

import { cn } from '@@/shared/lib/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '../../components/AdminBar'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { LivePreviewListener } from '../../components/LivePreviewListener'
import { Providers } from '../../providers'
import { InitTheme } from '../../providers/Theme/InitTheme'
import { mergeOpenGraph } from '../../utilities/mergeOpenGraph'
import './css/globals.css'
import { ScrollArea } from '@@/shared/ui/scroll-area'
import { getGlobal } from '@app/utilities/getGlobals'
import { WebsiteConfig } from '@payload-types'
import { getMeUser } from '@app/utilities/getMeUser'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteConfig: WebsiteConfig = await getGlobal('website-config')
  const meUser = await getMeUser()

  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''

  if (websiteConfig.underConstruction && (!meUser.user || !meUser.user.roles.includes('admin'))) {
    if (!pathname.includes('under-construction')) redirect('/under-construction')
  }

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <ScrollArea className="h-screen w-screen">
            <AdminBar />
            <LivePreviewListener />
            <Header />
            {children}
            <Footer />
          </ScrollArea>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
