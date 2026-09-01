// Next.js 16 renamed the `middleware` file convention to `proxy`
// (see node_modules/next/dist/docs/app/.../proxy.md). This file must be
// named proxy.ts (sibling of src/) for Next.js 16 to pick it up.
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
  // Don't persist a locale cookie. This way the locale is always
  // detected from the browser's Accept-Language header (unless the URL
  // explicitly contains a locale prefix), as required.
  localeCookie: false,
});

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};