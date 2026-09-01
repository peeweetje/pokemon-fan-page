import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonInfoProps {
  pokemon: any;
  types: string[];
  formattedId: string;
  category?: string;
  mainColor?: string;
}

export default function PokemonInfo({
  pokemon,
  types,
  formattedId,
  category,
  mainColor = typeColors.default,
}: PokemonInfoProps) {
  return (
    <div className="flex-1 animate-slide-up delay-100">
      <div
        className="mb-3 inline-flex items-center gap-3 rounded-full border px-3 py-1.5 shadow-sm"
        style={{
          backgroundColor: `${mainColor}1A`,
          borderColor: `${mainColor}66`,
        }}
      >
        <span className="text-xl font-mono text-slate-700">{formattedId}</span>
      </div>

      <div className="mb-2 flex items-center gap-3">
        <h1 className="text-3xl font-bold capitalize text-slate-900 md:text-4xl">
          {pokemon.name}
        </h1>
      </div>

      {category && (
        <p className="mb-4 text-lg font-medium" style={{ color: mainColor }}>
          {category}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {types.map((type: string) => (
          <span
            key={type}
            className="rounded-full px-4 py-1.5 text-white font-medium capitalize shadow-sm ring-2 ring-white/60"
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
