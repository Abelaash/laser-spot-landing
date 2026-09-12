'use client';

import { useEffect, useRef, useState } from 'react';

import { CheckIcon, PhoneIcon } from '@/components/Icons';
import { PriceBlock } from '@/components/PriceBlock';
import {
  BOOKING_ANCHOR,
  bookingForm,
  business,
  cta,
  offer,
  tracking,
} from '@/lib/config';
import { pushLeadEvent } from '@/lib/gtm';

type FieldName = 'name' | 'phone' | 'email' | 'preferred';
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts common North American formats: 10 digits, or 11 starting with 1. */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = bookingForm.errors.name;
  if (!isValidPhone(values.phone)) errors.phone = bookingForm.errors.phone;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = bookingForm.errors.email;
  return errors;
}

const initialValues: Record<FieldName, string> = {
  name: '',
  phone: '',
  email: '',
  preferred: '',
};

export function BookingForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  /** Fields the user has left once — we only show errors after that. */
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation once React has committed it, so keyboard
  // and screen-reader users land on the result instead of the top of the page.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function setField(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear an error as soon as the field becomes valid again.
    if (errors[field]) {
      const next = validate({ ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true });

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first field that needs attention.
      const firstInvalid = (['name', 'phone', 'email'] as const).find(
        (field) => nextErrors[field],
      );
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus('submitting');

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      preferred_time: values.preferred.trim(),
      form_name: tracking.formName,
      service: offer.service,
      offer_price: offer.showPrice ? offer.promoPrice : null,
      currency: offer.currency,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
    };

    try {
      if (tracking.formEndpoint) {
        const response = await fetch(tracking.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else if (process.env.NODE_ENV !== 'production') {
        // No endpoint configured — keep the page usable in development.
        // eslint-disable-next-line no-console
        console.warn(
          '[booking] NEXT_PUBLIC_FORM_ENDPOINT is not set; payload not sent:',
          payload,
        );
      }

      // Fire the conversion event only after the submission actually succeeded.
      pushLeadEvent();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  /* ---------------------------------------------------------------- success */

  if (status === 'success') {
    return (
      <section
        id={BOOKING_ANCHOR}
        aria-labelledby="booking-success-heading"
        className="scroll-anchor bg-plum-900"
      >
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="rounded-3xl bg-cream-50 p-8 text-center sm:p-12"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-plum-50 text-plum-700">
              <CheckIcon className="h-7 w-7" />
            </span>
            <h2
              id="booking-success-heading"
              className="mt-6 font-display text-3xl font-semibold tracking-tight text-plum-900"
            >
              {bookingForm.success.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-700">
              {bookingForm.success.body}
            </p>
            <p className="mt-6 text-sm text-ink-500">
              {bookingForm.success.secondary}
            </p>
            <a
              href={`tel:${business.phoneHref}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-plum-700 px-6 py-3 text-base font-semibold text-cream-50 transition-colors hover:bg-plum-900"
            >
              <PhoneIcon className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ form */

  return (
    <section
      id={BOOKING_ANCHOR}
      aria-labelledby="booking-heading"
      className="scroll-anchor bg-plum-900"
    >
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <h2
            id="booking-heading"
            className="font-display text-3xl font-semibold tracking-tight text-cream-50 sm:text-4xl"
          >
            {bookingForm.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-plum-100">
            {bookingForm.intro}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-cream-50 p-6 shadow-2xl sm:mt-10 sm:p-9">
          {offer.showPrice ? (
            <div className="mb-7 border-b border-plum-100 pb-6">
              <PriceBlock size="inline" />
            </div>
          ) : null}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label={bookingForm.labels.name}
                placeholder={bookingForm.placeholders.name}
                type="text"
                autoComplete="name"
                value={values.name}
                error={touched.name ? errors.name : undefined}
                onChange={(value) => setField('name', value)}
                onBlur={() => handleBlur('name')}
                className="sm:col-span-2"
              />

              <Field
                id="phone"
                label={bookingForm.labels.phone}
                placeholder={bookingForm.placeholders.phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                error={touched.phone ? errors.phone : undefined}
                onChange={(value) => setField('phone', value)}
                onBlur={() => handleBlur('phone')}
              />

              <Field
                id="email"
                label={bookingForm.labels.email}
                placeholder={bookingForm.placeholders.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={values.email}
                error={touched.email ? errors.email : undefined}
                onChange={(value) => setField('email', value)}
                onBlur={() => handleBlur('email')}
              />

              <Field
                id="preferred"
                label={bookingForm.labels.preferred}
                placeholder={bookingForm.placeholders.preferred}
                type="text"
                optional
                value={values.preferred}
                onChange={(value) => setField('preferred', value)}
                className="sm:col-span-2"
              />
            </div>

            {status === 'error' ? (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-plum-50 px-4 py-3 text-sm text-plum-700"
              >
                {bookingForm.errors.submit}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-7 w-full rounded-full bg-plum-700 px-8 py-4 text-base font-semibold text-cream-50 shadow-[0_8px_24px_-10px_rgba(51,34,44,0.65)] transition-colors hover:bg-plum-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' ? 'Sending…' : cta.formSubmit}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-ink-500">
              {bookingForm.privacyNote}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ field */

type FieldProps = {
  id: FieldName;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: 'tel' | 'email' | 'text';
  className?: string;
};

function Field({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  error,
  optional = false,
  autoComplete,
  inputMode,
  className = '',
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-plum-900"
      >
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-ink-500">
            ({bookingForm.optionalSuffix})
          </span>
        ) : null}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        required={!optional}
        className={`mt-1.5 w-full rounded-xl border bg-cream-50 px-4 py-3 text-base text-ink-900 placeholder:text-ink-500 transition-colors ${
          error
            ? 'border-plum-500 bg-plum-50/40'
            : 'border-plum-400 hover:border-plum-500'
        }`}
      />

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-plum-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
