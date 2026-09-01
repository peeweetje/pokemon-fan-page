import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonPhysicalAttributesProps {
  pokemon: any;
  mainColor?: string;
}

export default function PokemonPhysicalAttributes({
  pokemon,
  mainColor = typeColors.default,
}: PokemonPhysicalAttributesProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4">
      <div
        className="rounded-2xl border bg-white/80 p-4 shadow-sm"
        style={{ borderColor: `${mainColor}66` }}
      >
        <h3 className="mb-1 text-sm font-medium text-slate-600">Height</h3>
        <p className="text-lg font-semibold text-slate-900">
          {(pokemon.height / 10).toFixed(1)} m
        </p>
      </div>
      <div
        className="rounded-2xl border bg-white/80 p-4 shadow-sm"
        style={{ borderColor: `${mainColor}66` }}
      >
        <h3 className="mb-1 text-sm font-medium text-slate-600">Weight</h3>
        <p className="text-lg font-semibold text-slate-900">
          {(pokemon.weight / 10).toFixed(1)} kg
        </p>
      </div>
    </div>
  );
}
