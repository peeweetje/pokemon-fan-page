import { PokemonGrid } from '@/components/pokemon-grid';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import SecretPokeball from '@/components/secret-pokeball';

/**
 * Displays a Pokédex page that fetches and lists 100 Pokémon from the public PokéAPI.
 *
 * Fetches Pokémon data on the server, handles loading errors, and renders a styled layout with navigation, heading, a Pokémon grid, and a decorative component.
 *
 * @returns The JSX layout for the Pokédex page with fetched Pokémon data.
 */
export default async function PokeDex() {
  // Fetch all Pokémon (898 total)
  const pokemonResponse = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100'
  );

  const pokemonData = await pokemonResponse.json();

  if (!pokemonResponse.ok || pokemonData === null) {
    throw new Error('Failed to load Pokémon data');
  }

  return (
    <div className='min-h-screen bg-neutral-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-6'>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href='/'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Home
          </Link>
        </div>
        <h1 className='text-4xl font-bold text-center text-neutral-700 mb-8'>
          Pokédex
        </h1>
        <PokemonGrid initialPokemon={pokemonData.results ?? []} />
      </div>
      <SecretPokeball />
    </div>
  );
}
