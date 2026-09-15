/**
 * ============================================================================
 *  LEGAL COPY — privacy policy and terms
 * ============================================================================
 *  DRAFT. Written to satisfy Google Ads' requirement that a page collecting
 *  personal information links to a privacy policy, and to reflect how this
 *  page actually handles data (Formspree, Google Tag Manager). It is not
 *  legal advice — have it reviewed before launch.
 *
 *  Anything needing the clinic's confirmation is marked CONFIRM in a comment.
 * ============================================================================
 */

import { business, offer, tracking } from './config';

/** Shown at the top of both documents. Update when you change the text. */
export const legalLastUpdated = 'September 2026';

export type LegalSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

/* -------------------------------------------------------------------------- */
/*  PRIVACY POLICY                                                             */
/* -------------------------------------------------------------------------- */

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  intro: `This policy explains what personal information ${business.name} collects through this page, why we collect it, who processes it on our behalf, and how you can access or remove it. It applies to this booking page only.`,
  sections: [
    {
      heading: 'Who we are',
      body: [
        `${business.name} is a laser hair removal clinic located at ${business.addressLine}. You can reach us by phone at ${business.phoneDisplay} or by email at ${business.email}.`,
        `We are responsible for the personal information under our control and handle it in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).`,
      ],
    },
    {
      heading: 'Information you give us',
      body: [
        'When you submit the booking form on this page, we collect:',
      ],
      bullets: [
        'Your name',
        'Your phone number',
        'Your email address',
        'Your preferred day or time, if you choose to provide it',
      ],
    },
    {
      heading: 'Information collected automatically',
      body: [
        'Like most websites, this page uses cookies and similar technologies to understand how visitors arrive and what they do here. This may include your IP address, browser and device type, the pages you view, and the advertisement or link that brought you here.',
        'This information is used in aggregate to measure advertising performance. We do not use it to identify you personally.',
      ],
    },
    {
      heading: 'Why we collect it',
      body: ['We use the information you submit only to:'],
      bullets: [
        'Contact you to confirm or arrange your appointment',
        'Answer questions you ask us about treatment',
        'Keep a record of your booking request',
        'Measure how well our advertising performs, in aggregate',
      ],
    },
    {
      heading: 'Consent',
      body: [
        'Submitting the booking form is your consent for us to contact you about that appointment. You can withdraw consent at any time by calling or emailing the clinic, and we will stop contacting you and delete your details on request.',
        'We do not sell your personal information, and we do not share it with anyone for their own marketing purposes.',
      ],
    },
    {
      heading: 'Service providers',
      body: [
        'We use the following third parties to operate this page. Each receives only what it needs, and each processes data on our instructions:',
      ],
      bullets: [
        'Formspree — receives and delivers booking form submissions to the clinic. Formspree processes and stores submissions on servers located in the United States.',
        'Google (Tag Manager, Google Ads, Analytics) — measures advertising performance and website traffic.',
        'Meta (Facebook, Instagram) — measures the performance of advertising run on Meta platforms.',
        'GitHub Pages — hosts this page and records standard web server logs.',
      ],
    },
    {
      heading: 'Information stored outside Canada',
      body: [
        'Because some of the providers above operate in the United States and elsewhere, your information may be stored or processed outside Canada. While it is in another country, it may be accessible to the courts, law enforcement, and national security authorities of that country under its laws.',
        'If you would prefer not to submit your details through this page, you are welcome to call the clinic directly at ' +
          `${business.phoneDisplay} to book instead.`,
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        // CONFIRM with the clinic: actual retention period for enquiries that
        // never convert, and for client records after a course of treatment.
        'We keep booking enquiries only as long as needed to respond to them and to maintain a record of the appointment. If you do not become a client, we remove your enquiry from our systems once it is no longer needed. Client treatment records are kept for the period required for clinical and regulatory purposes.',
        'You can ask us to delete your information sooner at any time.',
      ],
    },
    {
      heading: 'How we protect it',
      body: [
        'This page is served over an encrypted HTTPS connection, and form submissions are transmitted encrypted. Access to booking enquiries is limited to clinic staff who need it to contact you.',
        'No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Your rights',
      body: ['You have the right to:'],
      bullets: [
        'Ask what personal information we hold about you',
        'Ask us to correct anything that is inaccurate',
        'Ask us to delete your information',
        'Withdraw your consent to being contacted',
        'Ask how your information has been used or disclosed',
      ],
    },
    {
      heading: 'Cookies and advertising',
      body: [
        'You can control or clear cookies through your browser settings. You can opt out of personalised Google advertising through Google Ads Settings, and adjust Meta ad preferences in your Facebook or Instagram account settings. Blocking cookies will not prevent you from using this page or submitting the booking form.',
      ],
    },
    {
      heading: 'Questions or concerns',
      body: [
        // CONFIRM with the clinic: who is the designated privacy contact.
        `To ask a question, make a request about your information, or raise a concern, contact us at ${business.email} or ${business.phoneDisplay}. We will respond within a reasonable time.`,
        'If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        `We may update this policy from time to time. The date at the top of this page shows when it was last changed.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  TERMS                                                                      */
/* -------------------------------------------------------------------------- */

export const termsOfUse: LegalDocument = {
  title: 'Terms & Conditions',
  intro: `These terms cover the promotional offer advertised on this page and your use of this booking page. By submitting the booking form you agree to them.`,
  sections: [
    {
      heading: 'The new-client offer',
      body: [
        `The advertised rate applies to ${offer.service.toLowerCase()} and is available to first-time ${business.name} clients only.`,
      ],
      bullets: [
        'One discounted session per person',
        'Not available on existing client accounts',
        'Cannot be combined with any other promotion, package, or discount',
        'Cannot be exchanged for cash or credit',
        'Pricing and availability may change at any time before an appointment is confirmed',
      ],
    },
    {
      heading: 'Existing clients',
      body: [
        'If you already have an account with us, this offer does not apply. Ask the front desk about referral savings instead.',
      ],
    },
    {
      heading: 'Booking and appointments',
      body: [
        'Submitting the form is a request, not a confirmed appointment. A member of the clinic team will contact you to arrange a time. No payment is taken through this page.',
        'A consultation and patch test are required before your first treatment. If the consultation indicates that treatment is not appropriate for you, we will tell you and no treatment will be performed.',
        // CONFIRM with the clinic: actual cancellation window and any fee.
        'Please give us at least 24 hours notice if you need to cancel or reschedule, so the appointment can be offered to someone else.',
      ],
    },
    {
      heading: 'No medical advice',
      body: [
        'The information on this page is general and is provided for information only. It is not medical advice and is not a substitute for a consultation with a qualified professional.',
        'Individual results vary. The number of sessions any person needs depends on factors assessed during consultation, and no particular outcome is promised or guaranteed.',
      ],
    },
    {
      heading: 'Information you give us',
      body: [
        'Please give accurate contact details so we can reach you, and tell the technician about any relevant medical conditions, medications, or skin sensitivities during your consultation. Withholding this information can make treatment unsafe.',
      ],
    },
    {
      heading: 'This page',
      body: [
        'The text, images, and design on this page belong to ' +
          `${business.name} and may not be copied or reused without permission.`,
        'We try to keep this page accurate and available, but we do not guarantee that it will always be error-free or uninterrupted.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        `To the extent permitted by law, ${business.name} is not liable for indirect or consequential losses arising from your use of this page. Nothing in these terms limits any liability that cannot be limited under applicable law, including in relation to the treatment itself.`,
      ],
    },
    {
      heading: 'Governing law',
      body: [
        `These terms are governed by the laws of the Province of ${business.province} and the federal laws of Canada that apply there.`,
      ],
    },
    {
      heading: 'Contact',
      body: [
        `Questions about these terms: ${business.email} or ${business.phoneDisplay}.`,
      ],
    },
  ],
};

/** Used by both pages for the "back to the offer" link. */
export const legalNav = {
  back: `Back to the ${offer.service.toLowerCase()} offer`,
  /** Fires no tracking — these are informational pages, not conversion paths. */
  formName: tracking.formName,
} as const;
