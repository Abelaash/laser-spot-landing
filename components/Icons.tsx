/**
 * Inline SVG icon set.
 *
 * These are inlined rather than pulled from an icon package so the page ships
 * no icon JS and no extra network requests. All are decorative — the meaning
 * is carried by the adjacent text — so they are marked aria-hidden.
 */

type IconProps = { className?: string };

const base = 'h-5 w-5';

export function StarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.13l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

export function UsersIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 19v-1.5a4 4 0 00-4-4H6a4 4 0 00-4 4V19" />
      <circle cx="9" cy="7" r="3.2" />
      <path d="M22 19v-1.5a4 4 0 00-3-3.87M16.5 4.3a4 4 0 010 7.4" />
    </svg>
  );
}

export function ShieldIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.8l7 3v5.6c0 4.3-2.9 8.3-7 9.6-4.1-1.3-7-5.3-7-9.6V5.8l7-3z" />
      <path d="M9.2 12.2l1.9 1.9 3.7-3.9" />
    </svg>
  );
}

export function SparkIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function LockIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 017.6 0v2.7" />
    </svg>
  );
}

export function BadgeIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M9.2 9.4l1.9 1.9 3.7-3.9" />
      <path d="M8.4 14.4L7 21.2l5-2.4 5 2.4-1.4-6.8" />
    </svg>
  );
}

export function SparkleIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.8l1.9 5.3 5.3 1.9-5.3 1.9L12 17.2l-1.9-5.3L4.8 10l5.3-1.9L12 2.8z" />
      <path d="M18.6 16.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </svg>
  );
}

export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 16.2v2.6a1.8 1.8 0 01-2 1.8 17.6 17.6 0 01-7.7-2.7 17.3 17.3 0 01-5.3-5.3A17.6 17.6 0 013.3 4.9 1.8 1.8 0 015.1 3h2.6a1.8 1.8 0 011.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 01-.4 1.9l-1.1 1.1a14.2 14.2 0 005.3 5.3l1.1-1.1a1.8 1.8 0 011.9-.4c.8.3 1.6.5 2.5.6A1.8 1.8 0 0121 16.2z" />
    </svg>
  );
}

export function CheckIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowDownIcon({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** Maps the config `icon` keys onto components. */
export const iconMap = {
  star: StarIcon,
  users: UsersIcon,
  shield: ShieldIcon,
  spark: SparkIcon,
  lock: LockIcon,
  badge: BadgeIcon,
  sparkle: SparkleIcon,
} as const;

export type IconKey = keyof typeof iconMap;

/** Renders a row of filled stars for a given rating. */
export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      <div className="flex gap-0.5 text-gold-500" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            className={i < rating ? 'h-4 w-4' : 'h-4 w-4 text-plum-100'}
          />
        ))}
      </div>
    </div>
  );
}
