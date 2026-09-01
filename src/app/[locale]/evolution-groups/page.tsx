/* eslint-disable @typescript-eslint/no-explicit-any */

import BackButton from '@/components/back-button';
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
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const data = await response.json();

  if (!response.ok || data === null) {
    throw new Error('Failed to load Pokémon data');
  }

  // Fetch all Pokemon details in parallel instead of sequentially
  const detailsPromises = data.results.map((pokemon: any) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      res.json().then((details) => ({ id, pokemon, details })),
    );
  });

  const allDetails = await Promise.all(detailsPromises);

  // Group Pokemon by evolution chains
  const groups: EvolutionGroup[] = [];
  let currentGroup: Pokemon[] = [];
  let groupId = 1;

  for (const { id, pokemon, details } of allDetails) {
    currentGroup.push({
      id: Number(id),
      name: pokemon.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
      types: details.types.map((t: any) => t.type.name),
    });

    // Create a new group every 3 Pokemon (or at the end)
    if (currentGroup.length === 3 || id === data.results[data.results.length - 1].url.split('/').filter(Boolean).pop()) {
      groups.push({
        id: groupId++,
        pokemon: [...currentGroup],
        name: currentGroup[0].name,
      });
      currentGroup = [];
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Evolution Groups
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for alignment */}
        </div>

        <EvolutionGroupsClient evolutionGroups={groups} />
      </div>
      <SecretPokeball />
    </div>
  );
}
