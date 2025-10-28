interface PokemonPhysicalAttributesProps {
  pokemon: any;
}

export default function PokemonPhysicalAttributes({
  pokemon,
}: PokemonPhysicalAttributesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Height</h3>
        <p className="text-lg font-medium">
          {(pokemon.height / 10).toFixed(1)} m
        </p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <h3 className="text-sm text-gray-500 mb-1">Weight</h3>
        <p className="text-lg font-medium">
          {(pokemon.weight / 10).toFixed(1)} kg
        </p>
      </div>
    </div>
  );
}
