import Image from 'next/image';

import { iconMap } from '@/components/Icons';
import { comfort } from '@/lib/config';

export function ComfortDiscretion() {
  return (
    <section
      id="comfort"
      aria-labelledby="comfort-heading"
      className="scroll-anchor bg-cream-100"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <h2
              id="comfort-heading"
              className="font-display text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl"
            >
              {comfort.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-700">
              {comfort.intro}
            </p>

            <ul className="mt-9 space-y-7">
              {comfort.pillars.map((pillar) => {
                const Icon = iconMap[pillar.icon];
                return (
                  <li key={pillar.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-50 text-plum-600 ring-1 ring-plum-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-plum-900">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                        {pillar.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative aspect-[4/3] max-h-[380px] overflow-hidden rounded-3xl bg-plum-50 sm:max-h-[460px] lg:aspect-[4/5] lg:max-h-none">
            <Image
              src={comfort.image.src}
              alt={comfort.image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
