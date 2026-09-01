'use client';

import { PokemonPagination } from '@/components/pokemon-grid/pokemon-pagination';
import { PokemonSearch } from '@/components/pokemon-search';
import { EvolutionGroupGrid } from './evolution-group-grid';
import { EvolutionGroup } from './evolution-types';
import { useState } from 'react';

interface EvolutionGroupsClientProps {
  evolutionGroups: EvolutionGroup[];
}

export function EvolutionGroupsClient({
  evolutionGroups,
}: EvolutionGroupsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter groups based on search query
  const filteredGroups = evolutionGroups.filter((group) =>
    group.pokemon.some((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGroups = filteredGroups.slice(startIndex, endIndex);

  return (
    <>
      <PokemonSearch onSearch={setSearchQuery} />

      <EvolutionGroupGrid groups={currentGroups} />

      <PokemonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
