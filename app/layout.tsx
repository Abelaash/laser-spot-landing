import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';

import { GtmHeadScripts, GtmNoScript } from '@/components/GtmScript';
import { business, hero, offer } from '@/lib/config';

import './globals.css';

/**
 * Google tag destinations for book.laserspot.ca.
 *
 * One gtag.js library serves both products: the <script src> loads the
 * library once, and each gtag('config', ...) call below registers another
 * destination for it. Adding a second gtag.js src would double-count.
 *
 * Hardcoded rather than read from env vars so the tag loads on every page
 * unconditionally — including the booking confirmation state — without
 * depending on a build-time variable being present.
 *
 * NOTE: these are the only Google tags on the site. GtmScript below is inert
 * (NEXT_PUBLIC_GTM_ID is unset). If a GTM container is ever enabled, do NOT
 * also configure these IDs inside it or every hit will be counted twice.
 */
const GOOGLE_ADS_ID = 'AW-16976821320';
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
gtag('config', '${GOOGLE_ADS_ID}');
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
