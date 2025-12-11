'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PokemonSearch } from '@/components/pokemon-search';
import { PokemonPagination } from '@/components/pokemon-grid/pokemon-pagination';

import { Pokemon } from '@/utils/battle-simulator-utils';

interface PokemonSelectionScreenProps {
  pokemonList: Pokemon[];
  onPokemonSelect: (pokemon: Pokemon) => void;
}

export function PokemonSelectionScreen({
  pokemonList,
  onPokemonSelect,
}: PokemonSelectionScreenProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 12;

  // Filter Pokemon based on search query
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate pagination for filtered Pokemon
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Handle search with PokemonSearch component
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  return (
    <>
      {/* Search Bar */}
      <PokemonSearch onSearch={handleSearch} />

      {/* Pokemon Selection Screen */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPokemon.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="cursor-pointer p-4 relative overflow-hidden"
              onClick={() => onPokemonSelect(pokemon)}
            >
              {/* Background color based on Pokemon type */}
              <div
                className={`absolute inset-0 z-0 bg-pokemon-${
                  pokemon.types?.[0] || 'default'
                }/15`}
              ></div>

              <div className="relative z-10">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    priority
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold capitalize mt-2">
                  {pokemon.name}
                </h3>
                <div className="flex justify-center gap-2 mt-2">
                  {pokemon.types?.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-1 text-xs font-medium text-white rounded-full capitalize bg-pokemon-${
                        type || 'default'
                      }`}
                    >
                      {type}
                    </span>
                  )) || []}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <PokemonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
