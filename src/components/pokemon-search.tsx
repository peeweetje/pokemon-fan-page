'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PokemonSearchProps {
  onSearch: (query: string) => void;
}

export function PokemonSearch({ onSearch }: PokemonSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  return (
    <div className='relative w-full max-w-md mx-auto mb-6'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
        <Input
          type='text'
          placeholder='Search Pokemon...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-10 w-full'
        />
      </div>
    </div>
  );
}

export default PokemonSearch;
