import Script from 'next/script';

import { tracking } from '@/lib/config';

/**
 * Standard GTM container snippet.
 *
 * `dataLayer` is initialized in a beforeInteractive script so that anything
 * pushing events before GTM finishes loading is queued rather than dropped.
 * Renders nothing at all when NEXT_PUBLIC_GTM_ID is unset, which keeps
 * local development free of tag noise.
 */
export function GtmHeadScripts() {
  if (!tracking.gtmId) return null;

  return (
    <>
      <Script id="datalayer-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
      <Script id="gtm-container" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${tracking.gtmId}');`}
      </Script>
    </>
  );
}

/** The <noscript> half of the GTM snippet. Must be first inside <body>. */
export function GtmNoScript() {
  if (!tracking.gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${tracking.gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
