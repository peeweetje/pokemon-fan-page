import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonTypesProps {
  types: string[];
}

/**
 * Gets the background color for a Pokemon based on its types.
 * Returns a valid CSS color string.
 * @param types The types of the Pokemon. Must be an array of strings.
 * @returns A CSS color string. The return value is a string that can be used
 *          directly in a CSS style. The color is a valid CSS color string.
 */
export function getTypeColor(types: Array<string>): string {
  if (!types || types.length === 0) return '#f5f5f5';

  const type = types[0];
  return `${
    typeColors[type as keyof typeof typeColors] || typeColors.default
  }15`; // 15 is hex for 8% opacity
}

export function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <div className='flex gap-1'>
      {types.slice(0, 2).map((type) => (
        <span
          key={type}
          className='px-2 py-0.5 text-xs font-medium text-white rounded-full capitalize'
          style={{
            backgroundColor:
              typeColors[type as keyof typeof typeColors] || typeColors.default,
          }}
        >
          {type}
        </span>
      ))}
    </div>
  );
}
