import PokemonImage from './pokemon-image';
import PokemonInfo from './pokemon-info';
import PokemonPhysicalAttributes from './pokemon-physical-attributes';
import PokemonAbilities from './pokemon-abilities';

interface PokemonHeaderProps {
  pokemon: any;
  species: any;
  types: string[];
  mainColor: string;
  formattedId: string;
  category?: string;
}

export default function PokemonHeader({
  pokemon,
  species,
  types,
  mainColor,
  formattedId,
  category,
}: PokemonHeaderProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <PokemonImage pokemon={pokemon} mainColor={mainColor} />
        <PokemonInfo
          pokemon={pokemon}
          types={types}
          formattedId={formattedId}
          category={category}
        />
      </div>
      <PokemonPhysicalAttributes pokemon={pokemon} />
      <PokemonAbilities pokemon={pokemon} />
    </div>
  );
}
