import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
