import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Analytics } from '@vercel/analytics/react'

/* ─── Google Fonts ────────────────────────────────────────────────── */
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Mr Dafoe is loaded via a <style> tag below because next/font doesn't support it
// in all Next.js versions; alternatively add a <link> in the head.

/* ─── Metadata ────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://ttconline.org'),
  title: {
    template: '%s | The Transformation Camp',
    default: 'The Transformation Camp — The Place of Your Making',
  },
  description:
    'The Transformation Camp (TTC) is a love-centred, Word-compliant, Spirit-empowered ministry raising Ministry Leaders through bi-weekly campus meetings online and onsite in Lagos, Nigeria.',
  keywords: [
    'The Transformation Camp',
    'TTC',
    'Binah Church International',
    'Pastor Daniel Odinaka',
    'PDee',
    'Lagos ministry',
    'Christian church Lagos',
    'transformation',
    'ministry leaders',
    'purpose',
    'discipleship',
  ],
  authors: [{ name: 'TAI Digital', url: 'https://theasaphmedia.com' }],
  creator: 'TAI Digital',
  openGraph: {
    type: 'website',
    siteName: 'The Transformation Camp',
    title: 'The Transformation Camp — The Place of Your Making',
    description:
      'A love-centred, Word-compliant, Spirit-empowered ministry raising 1 million Ministry Leaders. Bi-weekly campus meetings — online & onsite.',
    url: 'https://ttconline.org',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Transformation Camp — The Place of Your Making',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Transformation Camp — The Place of Your Making',
    description: 'Raising 1 million Ministry Leaders. The Place of Your Making.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#153093',
}

/* ─── Root Layout ─────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Mr Dafoe — decorative accent font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mr+Dafoe&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root { --font-mr-dafoe: 'Mr Dafoe'; }
        `}</style>
      </head>
      <body className="antialiased">
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
