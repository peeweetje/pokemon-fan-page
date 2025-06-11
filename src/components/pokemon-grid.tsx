'use client';

import useSWR from 'swr';
import { PokemonCard } from './pokemon-card';
import { PokemonSearch } from './pokemon-search';
import { PokemonCardSkeleton } from './loading/pokemon-card-skeleton';
import { useState, useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    }
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

  // Generate page numbers to display
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page numbers to show

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start
      if (currentPage <= 3) {
        end = 4;
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-500'>Error loading Pokémon data</p>
      </div>
    );
  }

  return (
    <div>
      <PokemonSearch onSearch={handleSearch} />
      {isLoading && pokemonList.length === 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {Array.from({ length: 10 }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredPokemon.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>
            No Pokémon found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {currentPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-8 flex justify-center'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                      }
                      className={`${
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer hover:bg-gray-100'
                      }`}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === '...' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(Number(page))}
                          isActive={currentPage === page}
                          className='cursor-pointer hover:bg-gray-100'
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                      }
                      className={`${
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer hover:bg-gray-100'
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
