'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { localeNames } from '@/i18n.config';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // Use the locale-prefixed pathname or current pathname
    const pathWithoutLocale = pathname.startsWith(`/${locale}`)
      ? pathname.slice(`/${locale}`.length) || '/'
      : pathname;

    // Always include locale prefix since localePrefix is set to 'always'
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">Pokémon</div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          <span>🌐</span>
          <span>{localeNames[locale as keyof typeof localeNames]}</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50">
            {(Object.entries(localeNames) as [string, string][]).map(
              ([code, name]) => (
                <button
                  key={code}
                  onClick={() => switchLanguage(code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                    locale === code ? 'bg-blue-100 font-semibold' : ''
                  }`}
                >
                  {name}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
