
import { useState, useEffect } from 'react';

interface PokemonDetails {
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export function usePokemonDetails(id: string, name: string) {
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPokemonData(data);
        }
      } catch (error) {
        console.error(`Failed to fetch details for ${name}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPokemonDetails();
    }
  }, [id, name]);

  return { pokemonData, isLoading };
}
