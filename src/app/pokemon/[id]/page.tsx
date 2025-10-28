/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';
import PokemonHeader from '@/app/pokemon/pokemon-header';
import { typeColors } from '@/utils/pokemon-type-colors';
import {
  getPokemonData,
  getPokemonSpecies,
} from '@/utils/pokemon-details-utils';

// Stat names mapping for better display
const statNames = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export async function generateStaticParams() {
  // Generate params for the first 100 Pokémons
  return Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonData(id);
  const species = await getPokemonSpecies(id);

  if (!pokemon) {
    notFound();
  }

  const types = pokemon.types.map((t: any) => t.type.name);
  const mainType = types[0];
  const mainColor =
    typeColors[mainType as keyof typeof typeColors] || typeColors.default;

  // Get English flavor text
  const flavorText = species?.flavor_text_entries
    ?.find((entry: any) => entry.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ');

  // Format Pokemon ID to #001 format
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  // Calculate max stat for relative progress bars
  const maxStat = Math.max(...pokemon.stats.map((stat: any) => stat.base_stat));

  // Get genus (category) in English
  const category = species?.genera?.find(
    (g: any) => g.language.name === 'en',
  )?.genus;

  return (
    <div
      className="min-h-screen p-6 animate-fade-in"
      style={{ backgroundColor: `${mainColor}15` }} // Very light background based on type
    >
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <BackButton href="/pokedex" text="Back to Pokédex" />
        </div>

        <PokemonHeader
          pokemon={pokemon}
          species={species}
          types={types}
          mainColor={mainColor}
          formattedId={formattedId}
          category={category}
        />

        {/* Description */}
        {flavorText && (
          <Card className='p-4 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}'>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="italic">{flavorText}</p>
          </Card>
        )}

        {/* Stats */}
        <Card className='p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}'>
          <h2 className="text-xl font-bold mb-4">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((stat: any) => (
              <div
                key={stat.stat.name}
                className="grid grid-cols-8 gap-2 items-center"
              >
                <div className="col-span-2 font-medium capitalize">
                  {statNames[stat.stat.name as keyof typeof statNames] ||
                    stat.stat.name}
                </div>
                <div className="col-span-1 text-right font-mono">
                  {stat.base_stat}
                </div>
                <div className="col-span-5">
                  <Progress
                    value={(stat.base_stat / maxStat) * 100}
                    className="h-3"
                    indicatorClassName={`${
                      stat.base_stat < 50
                        ? 'bg-red-500'
                        : stat.base_stat < 80
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Moves */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Moves</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {pokemon.moves.slice(0, 20).map((move: any) => (
              <span
                key={move.move.name}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm capitalize truncate"
              >
                {move.move.name.replace('-', ' ')}
              </span>
            ))}
            {pokemon.moves.length > 20 && (
              <span className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-500">
                +{pokemon.moves.length - 20} more
              </span>
            )}
          </div>
        </Card>
      </div>
      <SecretPokeball />
    </div>
  );
}
