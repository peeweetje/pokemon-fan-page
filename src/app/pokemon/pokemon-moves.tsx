import { Card } from '@/components/ui/card';
import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonMovesProps {
  moves: any[];
  mainColor?: string;
}

export default function PokemonMoves({
  moves,
  mainColor = typeColors.default,
}: PokemonMovesProps) {
  return (
    <Card
      className="border bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
      style={{ borderColor: `${mainColor}66` }}
    >
      <h2 className="mb-4 text-xl font-bold text-slate-900">Moves</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {moves.slice(0, 20).map((move: any) => (
          <span
            key={move.move.name}
            className="truncate rounded-full border bg-white/90 px-3 py-1.5 text-sm capitalize shadow-sm"
            style={{ borderColor: `${mainColor}66` }}
          >
            {move.move.name.replace('-', ' ')}
          </span>
        ))}
        {moves.length > 20 && (
          <span
            className="rounded-full border bg-white/90 px-3 py-1.5 text-sm text-slate-600 shadow-sm"
            style={{ borderColor: `${mainColor}55` }}
          >
            +{moves.length - 20} more
          </span>
        )}
      </div>
    </Card>
  );
}
