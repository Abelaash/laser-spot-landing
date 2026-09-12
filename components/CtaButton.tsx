'use client';

import type { ReactNode } from 'react';

import { BOOKING_ANCHOR } from '@/lib/config';
import { pushCtaClick } from '@/lib/gtm';

type CtaButtonProps = {
  children: ReactNode;
  /** Identifies which CTA fired, e.g. "hero" or "sticky_mobile". */
  location: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
};

const styles = {
  base:
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
    'transition-[transform,background-color,box-shadow] duration-200 ' +
    'active:scale-[0.98] motion-reduce:active:scale-100',
  variant: {
    primary:
      'bg-plum-700 text-cream-50 shadow-[0_8px_24px_-10px_rgba(51,34,44,0.65)] ' +
      'hover:bg-plum-900 hover:shadow-[0_12px_28px_-10px_rgba(51,34,44,0.7)]',
    secondary:
      'bg-cream-50 text-plum-900 ring-1 ring-plum-100 hover:bg-plum-50 hover:ring-plum-300',
  },
  size: {
    md: 'px-6 py-3 text-[0.95rem]',
    lg: 'px-8 py-4 text-base sm:text-lg',
  },
} as const;

/**
 * The single CTA used everywhere on the page. It is an anchor (not a button)
 * so it stays keyboard- and middle-click-friendly, scrolls to the booking
 * form, and fires a lightweight dataLayer event on the way.
 */
export function CtaButton({
  children,
  location,
  variant = 'primary',
  size = 'lg',
  className = '',
}: CtaButtonProps) {
  return (
    <a
      href={`#${BOOKING_ANCHOR}`}
      onClick={() => pushCtaClick(location)}
      className={`${styles.base} ${styles.variant[variant]} ${styles.size[size]} ${className}`}
    >
      {children}
    </a>
  );
}
