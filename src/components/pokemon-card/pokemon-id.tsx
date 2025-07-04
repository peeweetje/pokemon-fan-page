// Format Pokemon ID to #001 format
export const formatPokemonId = (id: string) => {
  const numId = Number.parseInt(id, 10);
  return `#${numId.toString().padStart(3, '0')}`;
};

export function PokemonId({ id }: { id: string | null }) {
  if (!id) {
    return null;
  }

  return (
    <div className="pt-2 px-2 relative z-10">
      <span className="text-xs font-mono text-gray-500 font-bold">
        {formatPokemonId(id)}
      </span>
    </div>
  );
}
