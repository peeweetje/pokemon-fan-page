import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonInfoProps {
  pokemon: any;
  types: string[];
  formattedId: string;
  category?: string;
}

export default function PokemonInfo({
  pokemon,
  types,
  formattedId,
  category,
}: PokemonInfoProps) {
  return (
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
    </div>
  );
}
