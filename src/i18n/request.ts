import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n.config';

export default getRequestConfig(async () => {
  const locale = locales.includes(defaultLocale) ? defaultLocale : locales[0];

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
