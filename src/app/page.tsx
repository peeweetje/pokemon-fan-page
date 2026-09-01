import { redirect } from 'next/navigation';

import { defaultLocale } from '@/i18n.config';

export const dynamic = 'force-static';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
