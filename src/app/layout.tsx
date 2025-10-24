import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { PikachuLogger } from '../components/pikachu-logger';

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
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <PikachuLogger />
        {children}
      </body>
    </html>
  );
}
