import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'SweetBites - Comparte tus Mejores Recetas de Reposteria',
  description: 'La comunidad de reposteros mas dulce. Descubre, comparte y guarda las mejores recetas de postres, tortas, galletas y mas.',
  generator: 'v0.app',
  keywords: ['recetas', 'postres', 'reposteria', 'tortas', 'galletas', 'chocolates', 'cocina'],
  authors: [{ name: 'SweetBites Team' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'SweetBites - Recetas de Reposteria',
    description: 'La comunidad de reposteros mas dulce',
    type: 'website',
  }
}

export const viewport: Viewport = {
  themeColor: '#6BD080',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
