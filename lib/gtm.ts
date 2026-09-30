/**
 * Google Tag Manager dataLayer helpers.
 *
 * No Google Ads or Meta Pixel IDs live in this codebase — every conversion tag
 * is configured inside the GTM container. This file only pushes events; GTM
 * decides what to do with them.
 */

import { leadValue, offer, tracking } from './config';

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Ads conversion action for a completed booking request.
 * The label after the slash identifies the specific conversion action in the
 * Ads account — changing the action means changing this string.
 */
const ADS_CONVERSION_SEND_TO = 'AW-16976821320/T0s7CKPElosdEMj4lp8_';

/**
 * Reports a completed booking to Google Ads.
 *
 * Separate from `pushLeadEvent` because the two go to different places: that
 * one pushes to the dataLayer for GTM, this one calls gtag.js directly. A bare
 * dataLayer push produces no gtag.js request, so without this the conversion
 * would never reach Google Ads.
 *
 * Call this only after a submission has genuinely succeeded. If gtag.js has
 * not loaded — blocked by an ad blocker, or offline — it does nothing rather
 * than throwing, so a tracking failure can never break the form.
 */
export function fireAdsConversion(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', { send_to: ADS_CONVERSION_SEND_TO });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[ads] conversion', ADS_CONVERSION_SEND_TO);
  }
}

/**
 * Pushes an event to window.dataLayer, creating the array if GTM has not
 * loaded yet. Safe to call during SSR (it becomes a no-op) and safe to call
 * when NEXT_PUBLIC_GTM_ID is unset — the events simply queue up unread.
 */
export function pushToDataLayer(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[dataLayer]', event);
  }
}

/**
 * Fired on a successful booking-form submission.
 * Shape is fixed by the GTM container — do not rename these keys.
 */
export function pushLeadEvent(): void {
  pushToDataLayer({
    event: tracking.events.lead,
    form_name: tracking.formName,
    value: leadValue,
    currency: offer.currency,
  });
}

/**
 * Lightweight click event for the hero / sticky / section CTAs, so CTA
 * engagement can be measured separately from completed leads.
 */
export function pushCtaClick(location: string): void {
  pushToDataLayer({
    event: tracking.events.ctaClick,
    cta_location: location,
    form_name: tracking.formName,
  });
}
