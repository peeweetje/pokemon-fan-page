/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
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

export const dynamic = 'force-static';

const FALLBACK_STATIC_POKEMON_IDS = ['1', '25'];

export async function generateStaticParams() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');

    if (!response.ok) {
      throw new Error('Unable to load Pokémon list for static params');
    }

    const data = (await response.json()) as {
      results?: Array<{ url?: string; name?: string }>;
    };

    const ids = (data.results ?? [])
      .map((pokemon) => pokemon.url?.split('/').filter(Boolean).at(-1))
      .filter((id): id is string => typeof id === 'string' && id.length > 0);

    if (ids.length === 0) {
      throw new Error('No Pokémon IDs were returned by the API');
    }

    return ids.map((id) => ({ id }));
  } catch (error) {
    console.error('Falling back to default static Pokemon params:', error);

    return FALLBACK_STATIC_POKEMON_IDS.map((id) => ({ id }));
  }
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
      style={{ backgroundColor: `${mainColor}12` }}
    >
      <div className="max-w-4xl mx-auto">
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
        <PokemonDescription flavorText={flavorText} mainColor={mainColor} />
        <PokemonStats pokemon={pokemon} maxStat={maxStat} mainColor={mainColor} />
        <PokemonMoves moves={pokemon.moves} mainColor={mainColor} />
      </div>
      <SecretPokeball />
    </div>
  );
}
