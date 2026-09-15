import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { business } from '@/lib/config';
import { termsOfUse } from '@/lib/legal';

export const metadata: Metadata = {
  title: `${termsOfUse.title} | ${business.name}`,
  description: termsOfUse.intro,
};

export default function TermsPage() {
  return <LegalPage document={termsOfUse} />;
}
