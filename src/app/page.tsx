import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { defaultLocale, locales } from '@/i18n.config';

export default async function RootPage() {
  const acceptLanguage = (await headers()).get('accept-language') ?? '';

  const detectedLocale = acceptLanguage
    .split(',')
    .map((entry) => entry.split(';')[0].trim().toLowerCase())
    .find((entry) => {
      const normalized = entry.split('-')[0];
      return locales.some((locale) => locale.toLowerCase() === normalized);
    })
    ?.
    split('-')[0]
    ?.toLowerCase();

  redirect(`/${detectedLocale && locales.includes(detectedLocale as any) ? detectedLocale : defaultLocale}`);
}
