import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n.config';

export const dynamic = 'force-static';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata(props: LocaleLayoutProps) {
  const params = await props.params;
  return {
    title: 'Pokemon',
    description: 'Everything you want to know about Pokemons',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Load messages directly for this locale
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
