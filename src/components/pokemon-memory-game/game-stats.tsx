import { Difficulty } from '@/utils/memory-game-helper';
import { Gauge, Timer, Zap } from 'lucide-react';

interface GameStatsProps {
  moves: number;
  formattedTime: string;
  difficulty: Difficulty;
}

export function GameStats({
  moves,
  formattedTime,
  difficulty,
}: GameStatsProps) {
  const stats = [
    {
      label: 'Moves',
      value: moves,
      icon: Zap,
      accent: 'text-amber-500',
      border: 'border-amber-500/50',
    },
    {
      label: 'Time',
      value: formattedTime,
      icon: Timer,
      accent: 'text-sky-500',
      border: 'border-sky-500/50',
    },
    {
      label: 'Difficulty',
      value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      icon: Gauge,
      accent: 'text-emerald-500',
      border: 'border-emerald-500/50',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:mx-auto sm:max-w-2xl sm:gap-3">
      {stats.map(({ label, value, icon: Icon, accent, border }) => (
        <div
          key={label}
          className={`rounded-2xl border bg-slate-50/80 px-2 py-3 text-center sm:px-4 sm:py-3 ${border}`}
        >
          <Icon className={`mx-auto mb-1 h-4 w-4 ${accent}`} aria-hidden="true" />
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-xs">
            {label}
          </p>
          <p className="mt-1 text-sm font-black text-slate-800 sm:text-base">
            {label}: {value}
          </p>
        </div>
      ))}
    </div>
  );
}
