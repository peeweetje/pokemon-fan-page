import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Stat names mapping for better display
const statNames = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

interface PokemonStatsProps {
  pokemon: any;
  maxStat: number;
}

export default function PokemonStats({ pokemon, maxStat }: PokemonStatsProps) {
  return (
    <Card className="p-6 mb-8 animate-slide-up delay-300">
      <h2 className="text-xl font-bold mb-4">Base Stats</h2>
      <div className="space-y-3">
        {pokemon.stats.map((stat: any) => (
          <div
            key={stat.stat.name}
            className="grid grid-cols-8 gap-2 items-center"
          >
            <div className="col-span-2 font-medium capitalize">
              {statNames[stat.stat.name as keyof typeof statNames] ||
                stat.stat.name}
            </div>
            <div className="col-span-1 text-right font-mono">
              {stat.base_stat}
            </div>
            <div className="col-span-5">
              <Progress
                value={(stat.base_stat / maxStat) * 100}
                className="h-3"
                indicatorClassName={`${stat.base_stat < 50
                    ? 'bg-red-500'
                    : stat.base_stat < 80
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
