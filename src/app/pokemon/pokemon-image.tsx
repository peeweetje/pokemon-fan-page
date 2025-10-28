import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface PokemonImageProps {
  pokemon: any;
  mainColor: string;
}

export default function PokemonImage({
  pokemon,
  mainColor,
}: PokemonImageProps) {
  return (
    <Card className="relative w-64 h-64 p-6 flex items-center justify-center border-2 animate-slide-up">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundColor: mainColor }}
      ></div>
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <div className="w-full h-full rounded-full border-[8px] border-black relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-black"></div>
        </div>
      </div>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
        width={200}
        height={200}
        priority
        className="z-10 drop-shadow-md animate-bounce-in"
      />
    </Card>
  );
}
