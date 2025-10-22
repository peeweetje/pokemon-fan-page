'use client';

import useSWR from 'swr';
import { PokemonSearch } from '../pokemon-search';
import { useState, useCallback } from 'react';
import { PokemonGridDisplay } from './pokemon-grid-display';
import { PokemonPagination } from './pokemon-pagination';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonGridProps {
  initialPokemon: Pokemon[];
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  });

const ITEMS_PER_PAGE = 20;

export function PokemonGrid({ initialPokemon }: PokemonGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Use SWR for client-side data fetching with the initial data from the server
  const { data, error, isLoading } = useSWR<{ results: Pokemon[] }>(
    'https://pokeapi.co/api/v2/pokemon?limit=100',
    fetcher,
    {
      fallbackData: { results: initialPokemon },
      revalidateOnFocus: false,
    },
  );

  const pokemonList = data?.results || [];

  // Filter Pokemon based on search query
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const searchLower = searchQuery.toLowerCase();
    // Extract the Pokemon number from the URL
    const pokemonNumber = pokemon.url.split('/').filter(Boolean).pop();
    // Search by name or number
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemonNumber?.includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading Pokémon data</p>
      </div>
    );
  }

  return (
    <div>
      <PokemonSearch onSearch={handleSearch} />
      <PokemonGridDisplay
        pokemon={currentPokemon}
        isLoading={isLoading}
        hasInitialData={pokemonList.length > 0}
        searchQuery={searchQuery}
      />
      <PokemonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
