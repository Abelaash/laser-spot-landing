'use client';

import { useEffect, useState } from 'react';

import { CtaButton } from '@/components/CtaButton';
import {
  BOOKING_ANCHOR,
  cta,
  offer,
  promoPriceLabel,
  regularPriceLabel,
} from '@/lib/config';

/**
 * Mobile-only sticky booking bar.
 *
 * Hidden until the hero CTA has scrolled out of view (so it never competes
 * with the primary above-the-fold button), and hidden again once the booking
 * form itself is on screen — a CTA that scrolls you to what you are already
 * looking at just gets in the way.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById(BOOKING_ANCHOR);
    if (!form) return;

    let formOnScreen = false;

    // IntersectionObserver rather than a scroll listener: no per-frame work
    // on the main thread while scrolling.
    const observer = new IntersectionObserver(
      ([entry]) => {
        formOnScreen = entry.isIntersecting;
        setVisible(!formOnScreen && window.scrollY > 320);
      },
      { threshold: 0 },
    );
    observer.observe(form);

    const onScroll = () => {
      setVisible(!formOnScreen && window.scrollY > 320);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      // `inert` while off-screen: removes the bar from the focus order and
      // from the accessibility tree in one go, so a hidden CTA can never be
      // tabbed into or announced.
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-plum-100 bg-cream-50/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-3">
        {offer.showPrice ? (
          <div className="min-w-0">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold text-plum-900">
                {promoPriceLabel}
              </span>
              <span className="text-sm text-ink-500 line-through decoration-plum-300">
                {regularPriceLabel}
              </span>
            </p>
            <p className="truncate text-[0.7rem] uppercase tracking-[0.12em] text-plum-600">
              {offer.eligibilityNote}
            </p>
          </div>
        ) : (
          <p className="min-w-0 truncate text-sm font-medium text-plum-900">
            {offer.service}
          </p>
        )}

        <CtaButton location="sticky_mobile" size="md" className="shrink-0">
          {cta.sticky}
        </CtaButton>
      </div>
    </div>
  );
}
