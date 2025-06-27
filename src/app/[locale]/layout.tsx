import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import '../globals.css';
import { notFound } from 'next/navigation';

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Everything you want to know about Pokemons',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
