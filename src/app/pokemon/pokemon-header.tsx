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
      <div
        className="mb-8 flex flex-col items-center gap-6 rounded-[2rem] border bg-white/75 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm md:flex-row md:items-start md:p-6"
        style={{ borderColor: `${mainColor}66` }}
      >
        <PokemonImage pokemon={pokemon} mainColor={mainColor} />
        <PokemonInfo
          pokemon={pokemon}
          types={types}
          formattedId={formattedId}
          category={category}
          mainColor={mainColor}
        />
      </div>
      <PokemonPhysicalAttributes pokemon={pokemon} mainColor={mainColor} />
      <PokemonAbilities pokemon={pokemon} mainColor={mainColor} />
    </div>
  );
}
