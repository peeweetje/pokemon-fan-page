/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';

// Pokemon type colors
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  default: '#68A090',
};

// Stat names mapping for better display
const statNames = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

async function getPokemonData(id: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
}

async function getPokemonSpecies(id: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon species data:', error);
    return null;
  }
}

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

        {/* Pokemon Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {/* Pokemon Image */}
          <Card className="relative w-64 h-64 p-6 flex items-center justify-center border-2 animate-slide-up">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: mainColor }}
            ></div>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <div className="w-full h-full rounded-full border-[8px] border-black relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-black"></div>
              </div>
            </div>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={pokemon.name}
              width={200}
              height={200}
              priority
              className="z-10 drop-shadow-md animate-bounce-in"
            />
          </Card>

          {/* Pokemon Info */}
          <div className='flex-1  animate-slide-up" style={{ animationDelay: "0.1s" }}'>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold capitalize">
                {pokemon.name}
              </h1>
              <span className="text-xl text-gray-500 font-mono">
                {formattedId}
              </span>
            </div>

            {category && (
              <p className="text-lg text-gray-600 mb-4">{category}</p>
            )}

            {/* Types */}
            <div className="flex gap-2 mb-4">
              {types.map((type: string) => (
                <span
                  key={type}
                  className="px-4 py-1 rounded-full text-white font-medium capitalize"
                  style={{
                    backgroundColor:
                      typeColors[type as keyof typeof typeColors] ||
                      typeColors.default,
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Physical attributes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-sm text-gray-500 mb-1">Height</h3>
                <p className="text-lg font-medium">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h3 className="text-sm text-gray-500 mb-1">Weight</h3>
                <p className="text-lg font-medium">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability: any) => (
                  <span
                    key={ability.ability.name}
                    className={`px-3 py-1 rounded-md bg-white border capitalize ${
                      ability.is_hidden ? 'border-dashed' : ''
                    }`}
                  >
                    {ability.ability.name.replace('-', ' ')}
                    {ability.is_hidden && (
                      <span className="text-xs ml-1 text-gray-500">
                        (Hidden)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

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
