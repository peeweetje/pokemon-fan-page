import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '../i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await Promise.resolve(requestLocale ?? defaultLocale)) as
    | string
    | undefined;
  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : defaultLocale;

  try {
    const messages = (await import(`../messages/${validLocale}.json`)).default;

    return {
      locale: validLocale,
      messages,
    };
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${validLocale}`, error);

    try {
      const fallbackMessages = (await import(`../messages/${defaultLocale}.json`))
        .default;

      return {
        locale: defaultLocale,
        messages: fallbackMessages,
      };
    } catch (fallbackError) {
      console.error(
        `Failed to load fallback messages for locale: ${defaultLocale}`,
        fallbackError,
      );

      return {
        locale: defaultLocale,
        messages: {},
      };
    }
  }
});
