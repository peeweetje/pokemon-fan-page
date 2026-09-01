export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
};
