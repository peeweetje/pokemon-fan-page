'use client';

import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface BattleScore {
  id: number;
  date: string;
  result: 'win' | 'loss';
  playerPokemon: { name: string; sprite: string };
  opponentPokemon: { name: string; sprite: string };
  playerHP: number;
  opponentHP: number;
}

export function useBattleScore() {

  const [scores, setScores] = useLocalStorage<BattleScore[]>(
    'battle-simulator-scores',
    [],
  );

  const addScore = useCallback((score: Omit<BattleScore, 'id' | 'date'>) => {
    setScores((prev) => [
      { ...score, id: Date.now(), date: new Date().toISOString() },
      ...prev,
    ]);
  }, [setScores]);

  const clearScores = useCallback(() => {
    setScores([]);
  }, [setScores]);

  return { scores, addScore, clearScores };
}
