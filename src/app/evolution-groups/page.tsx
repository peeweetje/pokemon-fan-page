/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import SecretPokeball from '@/components/secret-pokeball';
import { EvolutionGroupsClient } from './evolution-groups-client';

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface EvolutionGroup {
  id: number;
  pokemon: Pokemon[];
  name: string;
}

// Server Component for data fetching
export default async function EvolutionGroups() {
  // Fetch all Pokemon first
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const data = await response.json();

  if (!response.ok || data === null) {
    throw new Error('Failed to load Pokémon data');
  }

  // Group Pokemon by evolution chains
  const groups: EvolutionGroup[] = [];
  let currentGroup: Pokemon[] = [];
  let groupId = 1;

  for (const pokemon of data.results) {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    const detailsResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const details = await detailsResponse.json();

    currentGroup.push({
      id: Number(id),
      name: pokemon.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: details.types.map((t: any) => t.type.name),
    });

    // Create a new group every 3 Pokemon (or at the end)
    if (currentGroup.length === 3 || id === '100') {
      groups.push({
        id: groupId++,
        pokemon: [...currentGroup],
        name: currentGroup[0].name,
      });
      currentGroup = [];
    }
  }

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href='/'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Home
          </Link>
          <h1 className='text-4xl font-bold text-gray-800 text-center'>
            Evolution Groups
          </h1>
          <div className='w-[100px]'></div> {/* Spacer for alignment */}
        </div>

        <EvolutionGroupsClient evolutionGroups={groups} />
      </div>
      <SecretPokeball />
    </div>
  );
}
