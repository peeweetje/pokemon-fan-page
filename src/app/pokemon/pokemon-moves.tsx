import { Card } from '@/components/ui/card';

interface PokemonMovesProps {
  moves: any[];
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Moves</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {moves.slice(0, 20).map((move: any) => (
          <span
            key={move.move.name}
            className="px-3 py-1 bg-gray-100 rounded-md text-sm capitalize truncate"
          >
            {move.move.name.replace('-', ' ')}
          </span>
        ))}
        {moves.length > 20 && (
          <span className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-500">
            +{moves.length - 20} more
          </span>
        )}
      </div>
    </Card>
  );
}
