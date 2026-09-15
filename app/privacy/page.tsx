import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { business } from '@/lib/config';
import { privacyPolicy } from '@/lib/legal';

export const metadata: Metadata = {
  title: `${privacyPolicy.title} | ${business.name}`,
  description: privacyPolicy.intro,
};

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
