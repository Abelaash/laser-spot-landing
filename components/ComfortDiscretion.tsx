import { iconMap } from '@/components/Icons';
import { comfort } from '@/lib/config';

/**
 * Three-column standards section. No image column — see the note in Hero.
 */
export function ComfortDiscretion() {
  return (
    <section
      id="comfort"
      aria-labelledby="comfort-heading"
      className="scroll-anchor bg-cream-100"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <h2
            id="comfort-heading"
            className="font-display text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl"
          >
            {comfort.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-700">
            {comfort.intro}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3 md:gap-8">
          {comfort.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <li
                key={pillar.title}
                className="rounded-2xl border border-plum-100 bg-cream-50 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-plum-50 text-plum-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-plum-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
