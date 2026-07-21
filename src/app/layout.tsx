// ═══════════════════════════════════════════════
// MedCore AI — Root Layout
// Copyright © 2025 abdoayad
// ═══════════════════════════════════════════════

import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-en',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://medcoreai.com'),
  title: {
    default: 'MedCore AI — ادرس أذكى. اجتاز أسرع.',
    template: '%s | MedCore AI',
  },
  description: 'أول منصة طبية عربية بـ AI Agent متخصص في امتحانات الأزهر — ملخصات، بنوك أسئلة، PDF تفاعلي',
  keywords: ['طب الأزهر', 'مذاكرة الطب', 'AI Agent طبي', 'ملخصات طب', 'امتحانات طب الأزهر', 'MedCore AI'],
  authors: [{ name: 'abdoayad', url: 'https://medcoreai.com' }],
  creator: 'abdoayad',
  publisher: 'MedCore AI',
  category: 'Education',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: 'https://medcoreai.com',
    siteName: 'MedCore AI',
    title: 'MedCore AI — ادرس أذكى. اجتاز أسرع.',
    description: 'أول منصة طبية عربية بـ AI Agent متخصص في امتحانات الأزهر',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MedCore AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedCore AI',
    description: 'أول منصة طبية عربية بـ AI Agent متخصص في امتحانات الأزهر',
    images: ['/og-image.png'],
    creator: '@medcoreai',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  }
  alternates: {
    canonical: 'https://medcoreai.com',
    languages: { 'ar': 'https://medcoreai.com', 'en': 'https://medcoreai.com/en' },
  },
  other: {
    'copyright': '© 2025 MedCore AI — abdoayad — All rights reserved',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <html lang="ar" dir="rtl" suppressHydrationWarning className="font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#04060D" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F8FAFC" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Canonical copyright */}
        <meta name="copyright" content="© 2025 MedCore AI — abdoayad — All rights reserved" />
        <meta name="author" content="abdoayad" />
      </head>
      <body className={`${ibmPlexArabic.variable} ${spaceGrotesk.variable} font-ar antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--white)',
                fontFamily: 'var(--font-ar)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
