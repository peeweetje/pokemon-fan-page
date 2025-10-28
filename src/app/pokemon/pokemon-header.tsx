import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { typeColors } from '@/utils/pokemon-type-colors';
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
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
          <span className="text-xl text-gray-500 font-mono">{formattedId}</span>
        </div>

        {category && <p className="text-lg text-gray-600 mb-4">{category}</p>}

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
        <PokemonPhysicalAttributes pokemon={pokemon} />
        <PokemonAbilities pokemon={pokemon} />
      </div>
    </div>
  );
}
