import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { typeColors } from '@/utils/pokemon-type-colors';

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
  mainColor?: string;
}

export default function PokemonStats({
  pokemon,
  maxStat,
  mainColor = typeColors.default,
}: PokemonStatsProps) {
  return (
    <Card
      className="mb-8 animate-slide-up delay-300 border bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
      style={{ borderColor: `${mainColor}66` }}
    >
      <h2 className="mb-4 text-xl font-bold text-slate-900">Base Stats</h2>
      <div className="space-y-3">
        {pokemon.stats.map((stat: any) => (
          <div
            key={stat.stat.name}
            className="grid grid-cols-8 items-center gap-2"
          >
            <div className="col-span-2 font-medium capitalize text-slate-700">
              {statNames[stat.stat.name as keyof typeof statNames] ||
                stat.stat.name}
            </div>
            <div className="col-span-1 text-right font-mono text-slate-900">
              {stat.base_stat}
            </div>
            <div className="col-span-5">
              <Progress
                value={(stat.base_stat / maxStat) * 100}
                className="h-3 rounded-full bg-slate-100"
                indicatorClassName={`${stat.base_stat < 50
                    ? 'bg-gradient-to-r from-red-500 to-orange-400'
                    : stat.base_stat < 80
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500'
                  }`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
