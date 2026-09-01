import { Card } from '@/components/ui/card';
import { typeColors } from '@/utils/pokemon-type-colors';

interface PokemonDescriptionProps {
  flavorText?: string;
  mainColor?: string;
}

export default function PokemonDescription({
  flavorText,
  mainColor = typeColors.default,
}: PokemonDescriptionProps) {
  if (!flavorText) return null;

  return (
    <Card
      className="mb-8 animate-slide-up delay-200 border bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
      style={{ borderColor: `${mainColor}66` }}
    >
      <h2 className="mb-2 text-xl font-bold text-slate-900">Description</h2>
      <p className="italic text-slate-700">{flavorText}</p>
    </Card>
  );
}
