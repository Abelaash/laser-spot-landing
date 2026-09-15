import { PhoneIcon } from '@/components/Icons';
import { asset, business, footer } from '@/lib/config';
import { legalLastUpdated, type LegalDocument } from '@/lib/legal';

/**
 * Shared shell for the privacy and terms pages.
 *
 * Deliberately plain: a single readable column, no CTAs competing for
 * attention, and one clear route back to the offer.
 */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <header className="border-b border-plum-100 bg-cream-100">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a
            href={asset('/')}
            className="font-display text-xl font-semibold tracking-tight text-plum-900"
          >
            {business.name}
          </a>
          <a
            href={`tel:${business.phoneHref}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-plum-700 hover:text-plum-900"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{business.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <main className="bg-cream-50">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl">
            {document.title}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Last updated: {legalLastUpdated}
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            {document.intro}
          </p>

          <div className="mt-12 space-y-10">
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-plum-900">
                  {section.heading}
                </h2>

                {section.body?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-3 text-[0.95rem] leading-relaxed text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-plum-500"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-plum-100 pt-8">
            <a
              href={asset('/')}
              className="inline-flex items-center gap-2 rounded-full bg-plum-700 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-plum-900"
            >
              ← Back to the offer
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-plum-100 bg-cream-100">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
          <p className="text-xs leading-relaxed text-ink-500">
            {footer.disclaimer}
          </p>
          <p className="mt-3 text-xs text-ink-500">
            © {new Date().getFullYear()} {footer.legalName} ·{' '}
            {business.addressLine}
          </p>
        </div>
      </footer>
    </>
  );
}
