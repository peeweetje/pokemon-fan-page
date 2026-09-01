import { getRequestConfig } from 'next-intl/server';
import { locales } from './src/i18n.config';

import { defaultLocale } from './src/i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Determine the locale - requestLocale comes from the [locale] dynamic segment
  const baseLocale = await Promise.resolve(requestLocale);
  const locale = baseLocale || defaultLocale;

  // Validate locale
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  try {
    const messages = (await import(`./src/messages/${validLocale}.json`)).default;
    return {
      locale: validLocale,
      messages,
    };
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${validLocale}`, error);
    // Fallback to default locale
    try {
      const messages = (await import(`./src/messages/${defaultLocale}.json`)).default;
      return {
        locale: defaultLocale,
        messages,
      };
    } catch (fallbackError) {
      console.error(`Failed to load fallback messages for locale: ${defaultLocale}`, fallbackError);
      return {
        locale: defaultLocale,
        messages: {},
      };
    }
  }
});
