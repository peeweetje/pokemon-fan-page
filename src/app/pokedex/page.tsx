import { PokemonGrid } from '@/components/pokemon-grid/pokemon-grid';
import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';

export default function PokeDex() {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton />
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
