import { PhoneIcon } from '@/components/Icons';
import { business, eligibility, footer } from '@/lib/config';

export function EligibilityFooter() {
  return (
    <footer className="bg-cream-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        {/* --- Offer eligibility --- */}
        <section
          aria-labelledby="eligibility-heading"
          className="rounded-2xl border border-plum-100 bg-cream-50 p-6 sm:p-8"
        >
          <h2
            id="eligibility-heading"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-plum-600"
          >
            {eligibility.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            {eligibility.body}
          </p>
          <p className="mt-4 border-t border-plum-100 pt-4 text-sm leading-relaxed text-ink-700">
            {eligibility.existingClients}
          </p>
        </section>

        {/* --- Clinic details --- */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-start">
          <div>
            <p className="font-display text-lg font-semibold text-plum-900">
              {footer.legalName}
            </p>
            <p className="mt-1 text-sm text-ink-500">{footer.tagline}</p>
            <address className="mt-3 not-italic text-sm leading-relaxed text-ink-700">
              {business.addressLine}
              <br />
              {business.hours}
            </address>
          </div>

          <div className="sm:text-right">
            <a
              href={`tel:${business.phoneHref}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-plum-700 hover:text-plum-900"
            >
              <PhoneIcon className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
            <p className="mt-2 text-sm text-ink-500">{business.email}</p>

            <ul className="mt-4 flex gap-5 sm:justify-end">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-500 underline decoration-plum-300 underline-offset-4 hover:text-plum-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-plum-100 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-ink-500">
            {footer.disclaimer}
          </p>
          <p className="mt-3 text-xs text-ink-500">
            © {new Date().getFullYear()} {footer.legalName}. All rights reserved.
          </p>
        </div>

        {/* Breathing room so the sticky mobile bar never covers the footer. */}
        <div aria-hidden="true" className="h-20 md:hidden" />
      </div>
    </footer>
  );
}
