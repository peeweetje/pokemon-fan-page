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
      labelColor: 'text-amber-500',
      value: moves,
      icon: Zap,
      accent: 'text-amber-500',
      border: 'border-amber-400',
      background: 'bg-amber-100',
      textColor: 'text-amber-800',
    },
    {
      label: 'Time',
      labelColor: 'text-sky-500',
      value: formattedTime,
      icon: Timer,
      accent: 'text-sky-500',
      border: 'border-sky-400',
      background: 'bg-sky-100',
      textColor: 'text-sky-800',
    },
    {
      label: 'Difficulty',
      labelColor: 'text-emerald-500',
      value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      icon: Gauge,
      accent: 'text-emerald-500',
      border: 'border-emerald-400',
      background: 'bg-emerald-100',
      textColor: 'text-emerald-800',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:mx-auto sm:max-w-2xl sm:gap-3">
      {stats.map(({ label, value, icon: Icon, accent, border, background, textColor, labelColor }) => (
        <div
          key={label}
          className={`rounded-2xl border ${background} px-2 py-3 text-center sm:px-4 sm:py-3 ${border}`}
        >
          <Icon className={`mx-auto mb-1 h-4 w-4 ${accent}`} aria-hidden="true" />
          <p className={`text-[0.6rem] font-bold uppercase tracking-[0.14em] ${labelColor} sm:text-xs`}>
            {label}
          </p>
          <p className={`mt-1 text-sm font-black ${textColor} sm:text-base`}>
            {label}: {value}
          </p>
        </div>
      ))}
    </div>
  );
}
