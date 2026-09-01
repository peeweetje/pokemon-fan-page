import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n.config';

export default getRequestConfig(async () => {
  const validLocale = locales.includes(defaultLocale)
    ? defaultLocale
    : locales[0];

  try {
    const messages = (await import(`../messages/${validLocale}.json`)).default;

    return {
      locale: validLocale,
      messages,
    };
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${validLocale}`, error);

    return {
      locale: defaultLocale,
      messages: {},
    };
  }
});
