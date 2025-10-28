/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';
import PokemonHeader from '@/app/pokemon/pokemon-header';
import PokemonStats from '@/app/pokemon/pokemon-stats';
import PokemonDescription from '@/app/pokemon/pokemon-description';
import PokemonMoves from '@/app/pokemon/pokemon-moves';
import { typeColors } from '@/utils/pokemon-type-colors';
import {
  getPokemonData,
  getPokemonSpecies,
} from '@/utils/pokemon-details-utils';

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
        <PokemonDescription flavorText={flavorText} />
        <PokemonStats pokemon={pokemon} maxStat={maxStat} />
        <PokemonMoves moves={pokemon.moves} />
      </div>
      <SecretPokeball />
    </div>
  );
}
