import { StarRating } from '@/components/Icons';
import { socialProof, testimonials } from '@/lib/config';

export function SocialProof() {
  // Nothing is better than the wrong thing: an empty section reads as
  // deliberate, reviews for a different service read as careless.
  if (!socialProof.enabled || testimonials.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-anchor bg-cream-50"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
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
          <p className="mt-3 text-sm font-medium text-plum-600">
            {socialProof.summary}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li
              key={`${testimonial.name}-${index}`}
              className="flex flex-col rounded-2xl border border-plum-100 bg-cream-100 p-6"
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
      </div>
    </section>
  );
}
