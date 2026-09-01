import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonAbilitiesProps {
  pokemon: any;
  mainColor?: string;
}

export default function PokemonAbilities({
  pokemon,
  mainColor = typeColors.default,
}: PokemonAbilitiesProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-bold text-slate-900">Abilities</h2>
      <div className="flex flex-wrap gap-2">
        {pokemon.abilities.map((ability: any) => (
          <span
            key={ability.ability.name}
            className="rounded-full border bg-white/80 px-3 py-1.5 capitalize shadow-sm"
            style={{
              borderColor: `${mainColor}66`,
              borderStyle: ability.is_hidden ? 'dashed' : 'solid',
            }}
          >
            {ability.ability.name.replace('-', ' ')}
            {ability.is_hidden && (
              <span className="ml-1 text-xs text-slate-600">(Hidden)</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
