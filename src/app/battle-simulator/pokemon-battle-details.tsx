import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

interface PokemonBattleDetailsProps {
  pokemon?: {
    name: string;
    sprite: string;
  } | null;
  hp: number;
  isOpponent?: boolean;
}

export function PokemonBattleDetails({
  pokemon,
  hp,
  isOpponent = false,
}: PokemonBattleDetailsProps) {
  if (!pokemon) return null;

  return (
    <div
      className={`absolute ${isOpponent ? 'top-0 right-0' : 'bottom-0 left-0'}`}
    >
      <div className="relative w-32 h-32">
        <Image
          priority
          src={pokemon.sprite}
          alt={pokemon.name}
          fill
          className="object-contain"
        />
      </div>
      <div className={isOpponent ? 'text-right' : ''}>
        <h3 className="font-semibold capitalize">{pokemon.name}</h3>
        <Progress value={hp} className="w-32" />
      </div>
    </div>
  );
}
