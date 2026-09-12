import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';

import { GtmHeadScripts, GtmNoScript } from '@/components/GtmScript';
import { business, hero, offer } from '@/lib/config';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: `${offer.service} in ${business.city} | ${business.name}`,
  description: hero.subhead,
  robots: {
    // A paid-traffic landing page generally should not compete with the main
    // site in organic search. Flip this to `true` if you want it indexed.
    index: false,
    follow: true,
  },
  openGraph: {
    title: `${offer.service} in ${business.city} | ${business.name}`,
    description: hero.subhead,
    type: 'website',
    locale: 'en_CA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fdfbfa',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <GtmHeadScripts />
      </head>
      <body>
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
