import { PokemonCard } from '../pokemon-card/pokemon-card';
import { PokemonCardSkeleton } from '../loading/pokemon-card-skeleton';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonGridDisplayProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  hasInitialData: boolean;
  searchQuery: string;
}

export function PokemonGridDisplay({
  pokemon,
  isLoading,
  hasInitialData,
  searchQuery,
}: PokemonGridDisplayProps) {
  if (isLoading && !hasInitialData) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No Pokémon found matching "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemon.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
}
