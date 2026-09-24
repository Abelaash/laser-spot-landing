import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';

import { GtmHeadScripts, GtmNoScript } from '@/components/GtmScript';
import { business, hero, offer } from '@/lib/config';

import './globals.css';

/**
 * GA4 Measurement ID for book.laserspot.ca.
 *
 * Hardcoded rather than read from an env var so the tag loads on every page
 * unconditionally — including the booking confirmation state — without
 * depending on a build-time variable being present.
 *
 * NOTE: this is the only Google tag on the site. GtmScript below is currently
 * inert (NEXT_PUBLIC_GTM_ID is unset). If a GTM container is ever enabled,
 * do NOT also configure GA4 inside it or every hit will be counted twice.
 */
const GA_MEASUREMENT_ID = 'G-L4EEH7KFD8';

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
        {/* Google tag (gtag.js) — first in head so it loads as early as
            Next.js allows for a client-side script. */}
        <Script
          id="google-tag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>

        <GtmHeadScripts />
      </head>
      <body>
        <GtmNoScript />
        {children}
      </body>
    </html>
  );
}
