import { PokemonGrid } from '@/components/pokemon-grid';
import SecretPokeball from '@/components/secret-pokeball';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PokeDex() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="/"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-center text-neutral-700 mb-8">
          Pokédex
        </h1>
        <PokemonGrid initialPokemon={[]} />
      </div>
      <SecretPokeball />
    </div>
  );
}
