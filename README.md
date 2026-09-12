# Laser Spot — Brazilian Laser Hair Removal Landing Page

A single-page, mobile-first landing page built for paid traffic from Google Ads
and Meta Ads. Next.js (App Router) + TypeScript + Tailwind CSS, deployable to
Vercel as a static prerendered page.

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The page runs with no configuration at all — GTM stays off and the booking form
logs its payload to the console instead of posting. Fill in `.env.local` when
you're ready to wire up tracking and lead delivery.

---

## Environment variables

Both live in `.env.local` locally, and in **Vercel → Project → Settings →
Environment Variables** for deployed builds. Both are `NEXT_PUBLIC_*` because
they are read in the browser.

| Variable | Example | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | `GTM-ABC1234` | Your Google Tag Manager container. Leave empty and no GTM snippet renders at all. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | `https://hooks.zapier.com/hooks/catch/123/abc/` | Where the booking form POSTs its JSON. Leave empty and the form still validates, still fires the dataLayer event, and still shows the success state — it just skips the network call. |

> **Important:** these are baked in at build time. After changing them in
> Vercel you must **redeploy** for the new values to take effect.

### The form endpoint

Any URL that accepts a JSON `POST` works — Zapier, Make, n8n, a GoHighLevel
inbound webhook, Formspree, or your own API route. The payload is:

```json
{
  "name": "Jane Doe",
  "phone": "(905) 555-0123",
  "email": "jane@example.com",
  "preferred_time": "Saturday morning",
  "form_name": "brazilian_offer",
  "service": "Brazilian Laser Hair Removal",
  "offer_price": 59.99,
  "currency": "CAD",
  "page_url": "https://…",
  "submitted_at": "2026-09-03T18:20:00.000Z"
}
```

If the endpoint you use requires CORS, make sure it returns
`Access-Control-Allow-Origin` for your domain. (Zapier, Make and Formspree all
do by default.) If yours doesn't, add a Next.js route handler at
`app/api/lead/route.ts` that forwards the payload server-side, and point
`NEXT_PUBLIC_FORM_ENDPOINT` at `/api/lead`.

---

## Changing or hiding the $59.99 price

Everything lives in [`lib/config.ts`](lib/config.ts) — you never need to open a
component to change copy or pricing.

### Change the price

```ts
export const offer = {
  promoPrice: 59.99,   // ← change this one number
  regularPrice: 175,
  ...
};
```

That single value updates the hero price card, the sticky mobile bar, the
booking form header, and the `value` sent with the `generate_lead` dataLayer
event. Whole dollars render without decimals (`79` → `$79`), cents render with
them (`59.99` → `$59.99`).

### Hide the price entirely

```ts
export const offer = {
  showPrice: false,   // ← master switch
  ...
};
```

With `showPrice: false`:

- every price element disappears (hero card, sticky bar, form header);
- all CTAs fall back to `cta.ctaNoPrice` — "Book a Consultation";
- the `generate_lead` event reports `value: 0`, so you aren't sending a
  conversion value for a price you're no longer advertising.

The layout is designed to close up cleanly, so there's no empty gap left behind.

### Other common edits

| What | Where in `lib/config.ts` |
| --- | --- |
| Phone, address, hours, email | `business` |
| Headline and subhead | `hero` |
| Trust badges | `trustBadges` |
| Process steps, session length, session count | `whatToExpect` |
| Privacy / professionalism / hygiene copy | `comfort` |
| **Testimonials (3 placeholders to swap)** | `testimonials` |
| Form labels, placeholders, error and success text | `bookingForm` |
| New-client-only and referral wording | `eligibility` |
| Footer and disclaimers | `footer` |

---

## Tracking

The page pushes to the GTM `dataLayer`. **No Google Ads or Meta Pixel IDs exist
anywhere in this codebase** — every conversion tag is configured inside your GTM
container, which is the only thing this page loads.

`window.dataLayer` is initialized in a `beforeInteractive` script, so any event
fired before GTM finishes loading is queued rather than dropped.

### Events

**On successful form submission** (fires only after the POST succeeds, so failed
submissions aren't counted as leads):

```js
{ event: 'generate_lead', form_name: 'brazilian_offer', value: 59.99, currency: 'CAD' }
```

**On any CTA click** (hero and sticky mobile bar):

```js
{ event: 'cta_click', cta_location: 'hero', form_name: 'brazilian_offer' }
```

`cta_location` is `'hero'` or `'sticky_mobile'`.

### Setting it up in GTM

1. Create a **Custom Event** trigger with event name `generate_lead`.
2. Create Data Layer Variables for `value` and `currency`.
3. Attach your Google Ads Conversion and Meta Lead tags to that trigger, mapping
   the value and currency variables.
4. Optionally add a second Custom Event trigger on `cta_click` for engagement
   reporting.

In development, every dataLayer push is also logged to the browser console
prefixed with `[dataLayer]`, so you can verify the payloads without GTM Preview.

---

## Replacing the placeholder images

`public/images/` contains soft-gradient placeholders sized to the layout:

| File | Used by | Suggested aspect |
| --- | --- | --- |
| `clinic-treatment-room.png` | Hero | Portrait-ish, ~5:6 on desktop |
| `clinic-reception.png` | Comfort & discretion | Portrait-ish, ~4:5 on desktop |
| `technician-portrait.png` | *(spare)* | Portrait |
| `deka-motus-ax-device.png` | *(spare)* | Square |

Drop real photos in at the same filenames, or point `hero.image` /
`comfort.image` in `lib/config.ts` at new paths. **Always update the `alt` text
in the config** to describe the actual photo.

Use JPG or WebP for real photography — `next/image` serves AVIF/WebP
automatically and the hero image is marked `priority` so it loads first.

The placeholders were generated by `scripts/generate-placeholders.mjs`; you can
delete that script once real assets are in.

---

## Ad-platform compliance notes

The copy was written to keep the page approvable, and it's worth preserving
these constraints when you edit `lib/config.ts`:

- **No presumptive statements about the viewer's body.** Google restricts ads
  and landing pages that imply knowledge of a person's body or personal
  characteristics. All copy here describes the *service* and the *clinic* —
  never "your unwanted hair" or similar. Keep it that way.
- **Nothing explicit or intimate.** Meta requires professional, non-explicit
  imagery and copy. Use photography of the clinic environment, equipment, and
  staff — not of treatment areas or bodies.
- **No outcome guarantees.** `whatToExpect.disclaimer` and `footer.disclaimer`
  state that results and session counts vary. Don't remove them.
- **Keep the eligibility qualifier visible.** `offer.eligibilityNote`
  ("New clients only") renders next to every price, and the footer restates the
  full terms. Undisclosed conditional pricing is a common disapproval reason.

---

## Deploying to Vercel

**From the dashboard**

1. Push this directory to a Git repository.
2. In Vercel, **Add New → Project**, and import the repo. The Next.js preset is
   detected automatically — no build settings to change.
3. Under **Environment Variables**, add `NEXT_PUBLIC_GTM_ID` and
   `NEXT_PUBLIC_FORM_ENDPOINT` (set them for Production, Preview and
   Development).
4. **Deploy**, then add your custom domain under **Settings → Domains**.

**From the CLI**

```bash
npx vercel --prod
```

Remember: changing an env var in Vercel requires a redeploy before it takes
effect, since these values are inlined at build time.

---

## Notes on the build

- The page is **statically prerendered** — no server rendering at request time.
- No client-side JS ships except the booking form, the CTA click handlers, and
  the sticky bar. Icons are inline SVG, so there's no icon library in the
  bundle.
- Fonts (Inter + Fraunces) are self-hosted by `next/font`, so there's no
  render-blocking request to Google Fonts.
- The sticky bar uses `IntersectionObserver` rather than a scroll listener, and
  is marked `inert` while off-screen so a hidden CTA is never tabbable.
- Accessibility: semantic landmarks, a skip link, labelled fields with
  `aria-invalid` / `aria-describedby` error wiring, focus moved to the
  confirmation on submit, a visible focus ring throughout, and colour contrast
  that meets WCAG AA (including 3:1 borders on form controls).
- There is deliberately **no navigation menu** — nothing links away from the CTA.

```bash
npm run build
```

---

## Project structure

```
app/
  layout.tsx        Fonts, metadata, GTM snippet
  page.tsx          Section order
  globals.css       Design tokens (Tailwind v4 @theme)
components/
  Hero.tsx          Above-the-fold headline, price, CTA
  TrustBar.tsx      Credential badges
  WhatToExpect.tsx  Process walkthrough
  ComfortDiscretion.tsx
  SocialProof.tsx   Testimonials (config-driven)
  BookingForm.tsx   Validation, POST, dataLayer, success state
  EligibilityFooter.tsx
  StickyCta.tsx     Mobile-only sticky bar
  PriceBlock.tsx    Shared price display (honours showPrice)
  CtaButton.tsx     Shared CTA + click tracking
  Icons.tsx         Inline SVG icon set
lib/
  config.ts         ← all copy, pricing, business details
  gtm.ts            dataLayer helpers
```
