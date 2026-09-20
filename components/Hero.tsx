import { CtaButton } from '@/components/CtaButton';
import { CheckIcon, PhoneIcon } from '@/components/Icons';
import { PriceBlock } from '@/components/PriceBlock';
import { business, hero, offer, primaryCtaLabel } from '@/lib/config';

/**
 * Single-column hero.
 *
 * Deliberately has no image slot: the clinic is not supplying photography,
 * and an empty visual column reads as something failing to load. Centring the
 * content instead makes the full width look intentional and keeps the price
 * and CTA in one vertical line of attention.
 */
export function Hero() {
  return (
    <header className="relative overflow-hidden bg-cream-100">
      {/* Soft ambient wash. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-plum-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-32 h-[26rem] w-[26rem] rounded-full bg-plum-50/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-12">
        {/* Wordmark. Deliberately not a nav — nothing links away from the CTA. */}
        <div className="flex items-center justify-between gap-4">
          <p className="font-display text-xl font-semibold tracking-tight text-plum-900">
            {business.name}
          </p>
          <a
            href={`tel:${business.phoneHref}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-plum-700 hover:text-plum-900"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{business.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plum-600">
            {hero.eyebrow}
          </p>

          <h1 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-plum-900 sm:mt-4 sm:text-5xl lg:text-[3.5rem]">
            {hero.headline}
            <span className="block text-plum-600">{hero.headlineAccent}</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
            {hero.subhead}
          </p>

          {offer.showPrice ? (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-plum-100 bg-cream-50 p-5 shadow-[0_2px_24px_-14px_rgba(51,34,44,0.4)] sm:mt-8 sm:p-6">
              <PriceBlock size="hero" />
            </div>
          ) : null}

          <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
            <CtaButton location="hero" size="lg" className="w-full sm:w-auto">
              {primaryCtaLabel}
            </CtaButton>
            <a
              href={`tel:${business.phoneHref}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream-50 px-6 py-4 text-base font-semibold text-plum-900 ring-1 ring-plum-100 transition-colors hover:bg-plum-50 sm:w-auto"
            >
              <PhoneIcon className="h-4 w-4" />
              Call the clinic
            </a>
          </div>

          <ul className="mt-7 flex flex-col items-center gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7">
            {hero.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2 text-sm text-ink-700"
              >
                <CheckIcon className="h-4 w-4 shrink-0 text-plum-600" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
