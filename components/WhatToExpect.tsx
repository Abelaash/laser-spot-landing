import { whatToExpect } from '@/lib/config';

export function WhatToExpect() {
  return (
    <section
      id="what-to-expect"
      aria-labelledby="what-to-expect-heading"
      className="scroll-anchor bg-cream-50"
    >
      {/* Deep-link target for Google Ads sitelinks. A separate element
          because the section already carries id="what-to-expect", and an
          element can only have one id. Zero height, no layout effect. */}
      <span id="about" aria-hidden="true" className="scroll-anchor block" />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <h2
            id="what-to-expect-heading"
            className="font-display text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl"
          >
            {whatToExpect.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-700">
            {whatToExpect.intro}
          </p>
        </div>

        {/* Headline facts — the two things people scan for. */}
        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {whatToExpect.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-plum-100 bg-cream-100 px-6 py-5"
            >
              <dt className="text-sm text-ink-500">{fact.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-plum-900 sm:text-3xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Ordered process. <ol> because the order is meaningful. */}
        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {whatToExpect.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="font-display text-sm font-semibold text-plum-500"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                aria-hidden="true"
                className="mt-2 block h-px w-full bg-plum-100"
              />
              <h3 className="mt-4 text-base font-semibold text-plum-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-500">
          {whatToExpect.disclaimer}
        </p>
      </div>
    </section>
  );
}
