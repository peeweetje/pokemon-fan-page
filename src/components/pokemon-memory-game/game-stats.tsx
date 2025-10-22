import { Difficulty } from '@/utils/memory-game-helper';

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
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-sm sm:text-base text-gray-600">
      <p>Moves: {moves}</p>
      <p>Time: {formattedTime}</p>
      <p>
        Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </p>
    </div>
  );
}
