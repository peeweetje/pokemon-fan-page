'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LocaleSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (locale: string) => {
    router.push(`/${locale}`);
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
          <span>Language</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50">
            {['en', 'nl'].map((code) => (
              <button
                key={code}
                onClick={() => switchLanguage(code)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {code === 'en' ? 'English' : 'Nederlands'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
