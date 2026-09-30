'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { StarRating } from '@/components/Icons';
import { socialProof, testimonials } from '@/lib/config';

/**
 * Google reviews carousel.
 *
 * Built on CSS scroll-snap rather than an embedded widget (Elfsight,
 * Trustindex and similar): those add 50-150KB of third-party JavaScript and
 * external requests to a page whose load speed feeds the Google Ads Quality
 * Score, cannot be styled to match, and add another data processor to
 * disclose in the privacy policy. This costs nothing at runtime.
 *
 * The track is natively swipeable on touch and scrollable by keyboard; the
 * arrows and dots are progressive enhancement on top of that.
 */
export function SocialProof() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /**
   * Distance from one card to the next.
   *
   * Measured from the cards themselves rather than taken from offsetWidth:
   * the track has a gap between cards, so the step is card width PLUS gap.
   * Using the width alone drifts further out of step with every card added.
   */
  function cardStep(track: HTMLUListElement): number {
    const cards = track.children;
    const first = cards[0] as HTMLElement | undefined;
    const second = cards[1] as HTMLElement | undefined;
    if (first && second) return second.offsetLeft - first.offsetLeft;
    return first?.offsetWidth ?? track.clientWidth;
  }

  /** Derives the active card and the edge states from the scroll position. */
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = cardStep(track);

    setActive(step ? Math.round(track.scrollLeft / step) : 0);
    setAtStart(track.scrollLeft <= 1);
    // 2px of slack: sub-pixel widths mean scrollLeft rarely lands exactly.
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: cardStep(track) * direction, behavior: 'smooth' });
  }

  function scrollToCard(index: number) {
    const track = trackRef.current;
    if (!track) return;

    // Scroll to the card's own position rather than a multiple of the step,
    // so it stays correct even if a card ends up a different height or the
    // gap changes at a breakpoint.
    const first = track.children[0] as HTMLElement | undefined;
    const target = track.children[index] as HTMLElement | undefined;
    if (!first || !target) return;

    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: 'smooth',
    });
  }

  if (!socialProof.enabled || testimonials.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-anchor bg-cream-50"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              id="reviews-heading"
              className="font-display text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl"
            >
              {socialProof.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              {socialProof.intro}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-plum-600">
              <StarRating rating={5} />
              {socialProof.summary}
            </p>
          </div>

          {/* Arrows are hidden on touch widths, where swiping is the norm. */}
          <div className="hidden gap-2 md:flex">
            <CarouselButton
              label="Previous review"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </CarouselButton>
            <CarouselButton
              label="Next review"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
            >
              <ArrowIcon className="h-4 w-4" />
            </CarouselButton>
          </div>
        </div>

        <ul
          ref={trackRef}
          // Not a live region and not auto-advancing: an auto-rotating
          // carousel steals reading time and is a known accessibility problem.
          aria-label="Client reviews"
          className="carousel-track mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {testimonials.map((testimonial, index) => (
            <li
              key={`${testimonial.name}-${index}`}
              className="flex w-full flex-none snap-start flex-col rounded-2xl border border-plum-100 bg-cream-100 p-6 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-5 border-t border-plum-100 pt-4">
                <p className="text-sm font-semibold text-plum-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-ink-500">{testimonial.meta}</p>
              </footer>
            </li>
          ))}
        </ul>

        {/* Position indicator. Decorative — the cards themselves are the
            content, and the track is already reachable without these. */}
        {testimonials.length > 1 ? (
          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {testimonials.map((testimonial, index) => (
              <button
                key={`dot-${testimonial.name}-${index}`}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === active}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active
                    ? 'w-6 bg-plum-600'
                    : 'w-2 bg-plum-300 hover:bg-plum-500'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-plum-700 ring-1 ring-plum-100 transition-colors hover:bg-plum-50 hover:text-plum-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cream-100"
    >
      {children}
    </button>
  );
}

function ArrowIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
