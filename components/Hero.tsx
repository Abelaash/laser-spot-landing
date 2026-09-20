import Image from 'next/image';

import { CtaButton } from '@/components/CtaButton';
import { CheckIcon, PhoneIcon } from '@/components/Icons';
import { PriceBlock } from '@/components/PriceBlock';
import { business, hero, offer, primaryCtaLabel } from '@/lib/config';

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-cream-100">
      {/* Soft ambient wash behind the content. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-plum-50 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-12 lg:pb-24 lg:pt-16">
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

        <div className="mt-6 grid items-center gap-10 sm:mt-8 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ---- Copy column ---- */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-plum-600">
              {hero.eyebrow}
            </p>

            <h1 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-plum-900 sm:mt-4 sm:text-5xl lg:text-[3.5rem]">
              {hero.headline}
              <span className="block text-plum-600">{hero.headlineAccent}</span>
            </h1>

            <p className="mt-4 max-w-xl text-[0.975rem] leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              {hero.subhead}
            </p>

            {/* Price card — kept above the fold on mobile. */}
            {offer.showPrice ? (
              <div className="mt-5 rounded-2xl border border-plum-100 bg-cream-50 p-4 shadow-[0_2px_20px_-12px_rgba(51,34,44,0.35)] sm:mt-7 sm:p-6">
                <PriceBlock size="hero" />
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
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

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 sm:mt-7">
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

          {/* ---- Image column ---- */}
          <div className="relative">
            <div className="relative aspect-[4/3] max-h-[360px] overflow-hidden rounded-3xl bg-plum-50 sm:max-h-[440px] lg:aspect-[5/6] lg:max-h-none">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Floating credential chip over the image. */}
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-plum-100 bg-cream-50/95 px-4 py-3 backdrop-blur sm:left-6 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-semibold text-plum-900">
                {hero.deviceChip.title}
              </p>
              <p className="text-xs leading-relaxed text-ink-500">
                {hero.deviceChip.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
