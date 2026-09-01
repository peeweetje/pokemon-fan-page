/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';
import PokemonHeader from '../pokemon-header';
import PokemonStats from '../pokemon-stats';
import PokemonDescription from '../pokemon-description';
import PokemonMoves from '../pokemon-moves';
import { typeColors } from '@/utils/pokemon-type-colors';
import {
  getPokemonData,
  getPokemonSpecies,
} from '@/utils/pokemon-details-utils';

export async function generateStaticParams() {
  // Disabled to avoid next-intl config lookup during build
  // Pokemon pages will render dynamically instead
  return [];
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
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
      style={{ backgroundColor: `${mainColor}12` }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton href={`/${locale}/pokedex`} text="Back to Pokédex" />
        </div>

        <PokemonHeader
          pokemon={pokemon}
          species={species}
          types={types}
          mainColor={mainColor}
          formattedId={formattedId}
          category={category}
        />
        <PokemonDescription flavorText={flavorText} mainColor={mainColor} />
        <PokemonStats pokemon={pokemon} maxStat={maxStat} mainColor={mainColor} />
        <PokemonMoves moves={pokemon.moves} mainColor={mainColor} />
      </div>
      <SecretPokeball />
    </div>
  );
}
