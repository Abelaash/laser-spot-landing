import { BookingForm } from '@/components/BookingForm';
import { ComfortDiscretion } from '@/components/ComfortDiscretion';
import { EligibilityFooter } from '@/components/EligibilityFooter';
import { Hero } from '@/components/Hero';
import { SocialProof } from '@/components/SocialProof';
import { StickyCta } from '@/components/StickyCta';
import { TrustBar } from '@/components/TrustBar';
import { WhatToExpect } from '@/components/WhatToExpect';
import { BOOKING_ANCHOR } from '@/lib/config';

export default function Page() {
  return (
    <>
      <a
        href={`#${BOOKING_ANCHOR}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-50"
      >
        Skip to booking form
      </a>

      <Hero />

      <main>
        <TrustBar />
        <WhatToExpect />
        <ComfortDiscretion />
        <SocialProof />
        <BookingForm />
      </main>

      <EligibilityFooter />
      <StickyCta />
    </>
  );
}
