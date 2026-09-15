/**
 * ============================================================================
 *  LASER SPOT — LANDING PAGE CONFIG
 * ============================================================================
 *  Every piece of copy, pricing, and business detail on the page lives here.
 *  You should never need to open a component file to change wording or price.
 *
 *  QUICK EDITS:
 *   - Change the promo price ....... offer.promoPrice
 *   - Hide the price entirely ...... offer.showPrice = false
 *   - Swap testimonials ............ testimonials[]
 *   - Change phone / address ....... business
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  ASSET PATHS                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Prefixes a /public asset with the deployment's base path.
 *
 * On a GitHub Pages *project* site the app is served from /<repo-name>, and
 * `next/image` with `unoptimized: true` does NOT apply basePath automatically
 * the way it does for CSS and fonts — the src is passed through verbatim. So
 * image URLs have to carry the prefix themselves or they 404 in production
 * while working perfectly on localhost.
 *
 * Must stay in sync with `basePath` in next.config.mjs (both read the same
 * env var, so there is nothing to keep in sync by hand).
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}

/* -------------------------------------------------------------------------- */
/*  BUSINESS                                                                   */
/* -------------------------------------------------------------------------- */

export const business = {
  name: 'Laser Spot',
  city: 'Brampton',
  province: 'Ontario',
  provinceShort: 'ON',
  /** Shown in the footer. */
  addressLine: '11 Sidford Rd, Brampton, ON L7A 0P8',
  /** Displayed to users. */
  phoneDisplay: '(416) 843-1396',
  /** Used for the tel: link — digits only, with country code. */
  phoneHref: '+14168431396',
  email: 'info@laserspot.ca',
  hours: 'Mon–Sat, 10am – 7pm',
} as const;

/* -------------------------------------------------------------------------- */
/*  THE OFFER                                                                  */
/* -------------------------------------------------------------------------- */

export const offer = {
  /** The service being promoted. Title case — used for headings and labels. */
  service: 'Brazilian Laser Hair Removal',

  /**
   * The same service name written for use inside a sentence. Kept separate
   * because lowercasing the title-cased version would produce "brazilian",
   * and Brazilian is a proper adjective.
   */
  serviceInline: 'Brazilian laser hair removal',

  /**
   * NOT FINALIZED — change this one number and it updates everywhere
   * (hero, booking form, sticky bar, and the dataLayer conversion `value`).
   */
  promoPrice: 59.99,

  /** The standard single-session price, shown struck through for comparison. */
  regularPrice: 175,

  currency: 'CAD',
  currencySymbol: '$',

  /**
   * Master switch for all price display.
   * Set to `false` to run the page as a no-price "book a consultation" offer —
   * every price element disappears and the CTAs fall back to `ctaNoPrice`.
   * The dataLayer `value` also drops to 0 so you don't report a price you
   * are no longer advertising.
   */
  showPrice: true,

  /** Small qualifier rendered next to the price. Keep it visible — ad policy. */
  eligibilityNote: 'New clients only',

  /** Second half of the qualifier line, e.g. "New clients only · First session". */
  priceQualifier: 'First session',

  /** Optional urgency line under the price. Set to '' to hide. */
  scarcityNote: 'Limited new-client appointments each month',
} as const;

/* -------------------------------------------------------------------------- */
/*  CALLS TO ACTION                                                            */
/* -------------------------------------------------------------------------- */

export const cta = {
  /** Used when offer.showPrice is true. */
  primary: 'Book Your Session',
  /** Used when offer.showPrice is false. */
  ctaNoPrice: 'Book a Consultation',
  /** Sticky mobile bar button label. */
  sticky: 'Book Now',
  /** Booking form submit button. */
  formSubmit: 'Request My Appointment',
} as const;

/* -------------------------------------------------------------------------- */
/*  HERO                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: `${business.city}, ${business.provinceShort} · Licensed Laser Clinic`,
  headline: 'Brazilian Laser Hair Removal',
  headlineAccent: 'in Brampton',
  subhead:
    'Medical-grade DEKA Motus AX treatments performed by certified technicians in a private, professional clinic.',
  /** Short reassurance bullets under the CTA. */
  bullets: [
    'Private treatment rooms',
    'Certified laser technicians',
    'Sessions in about 20 minutes',
  ],
  image: {
    src: asset('/images/clinic-treatment-room.png'),
    alt: 'Treatment room at the Laser Spot clinic in Brampton, with a laser device and a prepared treatment bed',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  TRUST BAR                                                                  */
/* -------------------------------------------------------------------------- */

export type TrustBadge = {
  /** Icon key — see components/Icons.tsx for the available set. */
  icon: 'star' | 'users' | 'shield' | 'spark';
  label: string;
  sub: string;
};

export const trustBadges: TrustBadge[] = [
  { icon: 'star', label: '5.0 Rating', sub: 'Across client reviews' },
  { icon: 'users', label: '2,400+ Clients', sub: 'Served in Brampton' },
  { icon: 'shield', label: 'Health Canada', sub: 'Licensed equipment' },
  { icon: 'spark', label: 'DEKA Motus AX', sub: 'Alexandrite technology' },
];

/* -------------------------------------------------------------------------- */
/*  WHAT TO EXPECT                                                             */
/* -------------------------------------------------------------------------- */

export const whatToExpect = {
  heading: 'What to expect',
  intro:
    'A straightforward, clinical process from the first appointment through to your final session.',
  steps: [
    {
      title: 'Consultation & patch test',
      body: 'A certified technician reviews your health history, explains the treatment, and performs a small patch test to confirm the right laser settings.',
    },
    {
      title: 'Preparation',
      body: 'The treatment area is shaved and cleansed beforehand. You will receive written pre-care instructions when your appointment is confirmed.',
    },
    {
      title: 'The session',
      body: 'The DEKA Motus AX handpiece moves over the area in smooth passes. Its integrated cooling keeps the treatment comfortable from start to finish.',
    },
    {
      title: 'Aftercare',
      body: 'Most people return to their normal day right away. We provide aftercare guidance and book the next session before you leave.',
    },
  ],
  /** The two headline facts clients ask about most. */
  facts: [
    { value: '15–20 min', label: 'Typical session length' },
    { value: '6–8 sessions', label: 'Typical course, spaced 4–6 weeks apart' },
  ],
  /** Required-ish disclaimer. Keep it — it is good ad-policy hygiene. */
  disclaimer:
    'Treatment plans vary. The number of sessions needed is determined during your consultation and is not guaranteed.',
} as const;

/* -------------------------------------------------------------------------- */
/*  COMFORT & DISCRETION                                                       */
/* -------------------------------------------------------------------------- */

export const comfort = {
  heading: 'Comfort, privacy, and clinical standards',
  intro:
    'Laser Spot is built around a discreet, professional treatment experience. Here is how the clinic operates.',
  pillars: [
    {
      icon: 'lock' as const,
      title: 'Private by design',
      body: 'Every treatment takes place in a fully enclosed private room with its own door. Appointments are scheduled to limit overlap in the waiting area, and client records are kept confidential.',
    },
    {
      icon: 'badge' as const,
      title: 'Certified technicians',
      body: 'Treatments are performed only by trained, certified laser technicians who follow a documented clinical protocol. You are welcome to request a technician preference when you book.',
    },
    {
      icon: 'sparkle' as const,
      title: 'Hygiene & sanitation',
      body: 'Rooms are sanitized between every client. Linens are single-use or laundered per appointment, handpieces are disinfected to clinical standard, and consumables are never reused.',
    },
  ],
  image: {
    src: asset('/images/clinic-reception.png'),
    alt: 'The reception and waiting area of the Laser Spot clinic, with soft lighting and neutral furnishings',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  SOCIAL PROOF — swap these three out for real reviews                       */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Brampton" or "Verified client" */
  meta: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'PLACEHOLDER — The clinic is spotless and the staff explained every step before starting. Booking was easy and they ran exactly on time.',
    name: 'Placeholder Name',
    meta: 'Verified client · Brampton',
    rating: 5,
  },
  {
    quote:
      'PLACEHOLDER — Very professional from the consultation onward. The private rooms made a real difference, and the technician was great about answering questions.',
    name: 'Placeholder Name',
    meta: 'Verified client · Brampton',
    rating: 5,
  },
  {
    quote:
      'PLACEHOLDER — Clear pricing, no pressure, and they walked me through the full treatment plan up front. Would recommend to anyone comparing clinics.',
    name: 'Placeholder Name',
    meta: 'Verified client · Brampton',
    rating: 5,
  },
];

export const socialProof = {
  heading: 'What clients say',
  intro: 'Reviews from clients treated at our Brampton location.',
  /** Summary line above the cards. */
  summary: '5.0 average rating · 2,400+ clients served',
} as const;

/* -------------------------------------------------------------------------- */
/*  BOOKING FORM                                                               */
/* -------------------------------------------------------------------------- */

export const bookingForm = {
  heading: 'Book your appointment',
  intro:
    'Send your details and a member of the clinic team will confirm your appointment time. No payment is taken online.',
  labels: {
    name: 'Full name',
    phone: 'Phone number',
    email: 'Email address',
    preferred: 'Preferred day / time',
  },
  placeholders: {
    name: 'Jane Doe',
    phone: '(905) 555-0123',
    email: 'you@example.com',
    preferred: 'e.g. Saturday morning, or weekday evenings',
  },
  optionalSuffix: 'optional',
  /**
   * Subject line for the notification email the clinic receives.
   * Formspree reads the `_subject` key; other endpoints ignore it harmlessly.
   */
  emailSubject: 'New booking request — Brazilian offer (Laser Spot)',

  /** Text under the submit button. */
  privacyNote:
    'We use your details only to contact you about this appointment. No spam, and you can ask us to delete your information at any time.',
  success: {
    heading: 'Request received',
    body: 'Thank you. A member of the clinic team will contact you shortly to confirm your appointment time.',
    secondary: 'Prefer to talk now? Call the clinic directly.',
  },
  errors: {
    name: 'Please enter your name.',
    phone: 'Please enter a valid phone number.',
    email: 'Please enter a valid email address.',
    submit: 'Something went wrong sending your request. Please try again, or call the clinic.',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  ELIGIBILITY / FOOTER                                                       */
/* -------------------------------------------------------------------------- */

export const eligibility = {
  heading: 'Offer eligibility',
  /** Main new-client-only statement. */
  body: 'The new-client rate applies to first-time Laser Spot clients only, is limited to one session per person, and cannot be combined with other promotions or packages. Pricing and availability are subject to change.',
  /** The existing-client line. */
  existingClients:
    'Already a Laser Spot client? This offer is not available on existing accounts, but ask the front desk about our referral savings.',
} as const;

export const footer = {
  legalName: 'Laser Spot',
  tagline: 'Laser hair removal clinic · Brampton, Ontario',
  links: [
    { label: 'Privacy Policy', href: asset('/privacy/') },
    { label: 'Terms', href: asset('/terms/') },
  ],
  /** Medical-style disclaimer. Good practice for paid traffic. */
  disclaimer:
    'Results vary from person to person. Information on this page is general and is not medical advice. A consultation is required before treatment.',
} as const;

/* -------------------------------------------------------------------------- */
/*  TRACKING                                                                   */
/* -------------------------------------------------------------------------- */

export const tracking = {
  /**
   * GTM container ID, e.g. "GTM-XXXXXXX". Set NEXT_PUBLIC_GTM_ID in .env.local.
   * If it is empty, no GTM snippet is rendered at all.
   */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',

  /**
   * Where the booking form POSTs its JSON payload.
   * Set NEXT_PUBLIC_FORM_ENDPOINT in .env.local (Zapier / Make / GHL / n8n /
   * your own API route — anything that accepts a JSON POST).
   * If it is empty, the form still validates, still pushes to the dataLayer,
   * and still shows the success state — it just skips the network call and
   * logs the payload to the console. Handy in development.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',

  /** Identifies this page's form in GTM / GA4. */
  formName: 'brazilian_offer',

  /** dataLayer event names. */
  events: {
    lead: 'generate_lead',
    ctaClick: 'cta_click',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  DERIVED HELPERS — no need to edit below this line                          */
/* -------------------------------------------------------------------------- */

/** Formats a number as a price string, e.g. 59.99 -> "$59.99", 175 -> "$175". */
export function formatPrice(value: number): string {
  const hasCents = !Number.isInteger(value);
  return `${offer.currencySymbol}${value.toFixed(hasCents ? 2 : 0)}`;
}

export const promoPriceLabel = formatPrice(offer.promoPrice);
export const regularPriceLabel = formatPrice(offer.regularPrice);

/** The CTA label that respects the showPrice switch. */
export const primaryCtaLabel = offer.showPrice ? cta.primary : cta.ctaNoPrice;

/** Conversion value reported to the dataLayer. */
export const leadValue = offer.showPrice ? offer.promoPrice : 0;

/** Anchor id for the booking form — used by every CTA on the page. */
export const BOOKING_ANCHOR = 'book';
