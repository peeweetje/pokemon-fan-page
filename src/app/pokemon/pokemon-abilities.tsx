interface PokemonAbilitiesProps {
  pokemon: any;
}

export default function PokemonAbilities({ pokemon }: PokemonAbilitiesProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Abilities</h2>
      <div className="flex flex-wrap gap-2">
        {pokemon.abilities.map((ability: any) => (
          <span
            key={ability.ability.name}
            className={`px-3 py-1 rounded-md bg-white border capitalize ${
              ability.is_hidden ? 'border-dashed' : ''
            }`}
          >
            {ability.ability.name.replace('-', ' ')}
            {ability.is_hidden && (
              <span className="text-xs ml-1 text-gray-500">(Hidden)</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
