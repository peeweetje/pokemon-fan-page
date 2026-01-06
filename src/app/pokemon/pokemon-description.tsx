import { Card } from '@/components/ui/card';

interface PokemonDescriptionProps {
  flavorText?: string;
}

export default function PokemonDescription({
  flavorText,
}: PokemonDescriptionProps) {
  if (!flavorText) return null;

  return (
    <Card className="p-4 mb-8 animate-slide-up delay-200">
      <h2 className="text-xl font-bold mb-2">Description</h2>
      <p className="italic">{flavorText}</p>
    </Card>
  );
}
