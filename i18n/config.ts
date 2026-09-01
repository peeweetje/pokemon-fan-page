import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../src/i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await Promise.resolve(requestLocale ?? defaultLocale)) as
    | (typeof locales)[number]
    | undefined;

  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : defaultLocale;

  try {
    const messages = (await import(`../src/messages/${validLocale}.json`)).default;

    return {
      locale: validLocale,
      messages,
    };
  } catch (error) {
    console.warn(`Failed to load locale messages for ${validLocale}`, error);

    return {
      locale: defaultLocale,
      messages: (await import(`../src/messages/${defaultLocale}.json`)).default,
    };
  }
});
