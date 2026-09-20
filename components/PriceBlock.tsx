import {
  offer,
  promoPriceLabel,
  regularPriceLabel,
} from '@/lib/config';

type PriceBlockProps = {
  /** 'hero' is the large above-the-fold treatment; 'inline' is compact. */
  size?: 'hero' | 'inline';
  className?: string;
};

/**
 * The price comparison. Renders nothing when `offer.showPrice` is false, so
 * turning the price off cleanly removes it everywhere it appears.
 */
export function PriceBlock({ size = 'hero', className = '' }: PriceBlockProps) {
  if (!offer.showPrice) return null;

  const isHero = size === 'hero';

  return (
    <div className={className}>
      <div
        className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
          isHero ? 'justify-center' : ''
        }`}
      >
        <span
          className={
            isHero
              ? 'font-display text-[2.75rem] font-semibold leading-none tracking-tight text-plum-900 sm:text-6xl'
              : 'font-display text-3xl font-semibold leading-none text-plum-900'
          }
        >
          {promoPriceLabel}
        </span>

        <span
          className={
            isHero
              ? 'text-lg text-ink-500 line-through decoration-plum-300 decoration-2'
              : 'text-base text-ink-500 line-through decoration-plum-300 decoration-2'
          }
        >
          {regularPriceLabel}
        </span>

        <span className="sr-only">
          {`New-client price ${promoPriceLabel}, regular price ${regularPriceLabel}.`}
        </span>
      </div>

      <p
        className={
          isHero
            ? 'mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-plum-600 sm:text-sm'
            : 'mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-plum-600'
        }
      >
        {offer.eligibilityNote}
        {offer.priceQualifier ? ` · ${offer.priceQualifier}` : null}
      </p>

      {isHero && offer.scarcityNote ? (
        <p className="mt-1.5 text-center text-sm leading-snug text-ink-500">
          {offer.scarcityNote}
        </p>
      ) : null}
    </div>
  );
}
