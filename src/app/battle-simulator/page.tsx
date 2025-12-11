/* eslint-disable @typescript-eslint/no-explicit-any */

import BackButton from '@/components/back-button';
import SecretPokeball from '@/components/secret-pokeball';
import { BattleSimulatorClient } from './battle-simulator-client';

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  url: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  moves: {
    name: string;
    type: string;
    power: number;
    accuracy: number;
  }[];
}

// Server Component for data fetching
export default async function BattleSimulator() {
  // Fetch all Pokemon first
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const data = await response.json();

  if (!response.ok || data === null) {
    throw new Error('Failed to load Pokémon data');
  }

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: Pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      // Get moves (limit to 4)
      const moves = await Promise.all(
        details.moves.slice(0, 4).map(async (move: any) => {
          const moveResponse = await fetch(move.move.url);
          const moveData = await moveResponse.json();
          return {
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || 0,
            accuracy: moveData.accuracy || 100,
          };
        }),
      );

      return {
        id: details.id,
        name: details.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`,
        types: details.types.map((t: any) => t.type.name),
        stats: {
          hp: details.stats[0].base_stat,
          attack: details.stats[1].base_stat,
          defense: details.stats[2].base_stat,
          'special-attack': details.stats[3].base_stat,
          'special-defense': details.stats[4].base_stat,
          speed: details.stats[5].base_stat,
        },
        moves,
      };
    }),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Battle Simulator
        </h1>
        <BattleSimulatorClient pokemonList={pokemonDetails} />
      </div>
      <SecretPokeball />
    </div>
  );
}
