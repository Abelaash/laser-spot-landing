import { iconMap } from '@/components/Icons';
import { trustBadges } from '@/lib/config';

export function TrustBar() {
  return (
    <section aria-label="Clinic credentials" className="border-y border-plum-100 bg-cream-50">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 lg:grid-cols-4">
          {trustBadges.map((badge) => {
            const Icon = iconMap[badge.icon];
            return (
              <li key={badge.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-600">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight text-plum-900">
                    {badge.label}
                  </span>
                  <span className="block text-xs leading-snug text-ink-500">
                    {badge.sub}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
