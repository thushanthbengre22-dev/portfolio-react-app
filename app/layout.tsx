import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Thushanth Bengre | Full Stack Developer & AI Explorer',
  description: 'Full-stack engineer specializing in Java, React, and AI experimentation. Building scalable digital experiences.',
  openGraph: {
    title: 'Thushanth Bengre | Portfolio',
    description: 'Architecting robust systems and exploring the latent space.',
    url: 'https://bengredev.com',
    siteName: 'Thushanth Bengre Portfolio',
    images: [
      {
        url: '/opengraph-image.png', // Create a 1200x630 image for social previews!
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f1319',
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
