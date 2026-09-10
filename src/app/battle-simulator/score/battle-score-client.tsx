'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, XCircle, Trash2, Swords } from 'lucide-react';
import { useBattleScore } from '@/hooks/use-battle-score';
import type { BattleScore } from '@/hooks/use-battle-score';

function ScoreCard({ score }: { score: BattleScore }) {
  const isWin = score.result === 'win';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-4 rounded-lg p-4 shadow-sm ${
        isWin ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}
    >
      {isWin ? (
        <Trophy className="h-8 w-8 shrink-0 text-green-600" />
      ) : (
        <XCircle className="h-8 w-8 shrink-0 text-red-600" />
      )}

      <div className="flex flex-1 items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={score.playerPokemon.sprite}
            alt={score.playerPokemon.name}
            className="h-14 w-14"
          />
          <span className="text-xs font-medium capitalize text-gray-700">
            {score.playerPokemon.name}
          </span>
          <span className="text-xs text-gray-500">HP: {score.playerHP}</span>
        </div>

        <Swords className="h-5 w-5 text-gray-400" />

        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={score.opponentPokemon.sprite}
            alt={score.opponentPokemon.name}
            className="h-14 w-14"
          />
          <span className="text-xs font-medium capitalize text-gray-700">
            {score.opponentPokemon.name}
          </span>
          <span className="text-xs text-gray-500">HP: {score.opponentHP}</span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span
          className={`block text-sm font-bold ${
            isWin ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {isWin ? 'Victory' : 'Defeat'}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(score.date).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}

export function BattleScoreClient() {
  const { scores, clearScores } = useBattleScore();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch: localStorage is only available on the client,
  // so wait until after mount before rendering stored scores.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg bg-white/60 shadow"
            />
          ))}
        </div>
        <div className="rounded-lg bg-white/80 p-8 text-center text-gray-500">
          Loading battle scores...
        </div>
      </div>
    );
  }

  const wins = scores.filter((s) => s.result === 'win').length;
  const losses = scores.length - wins;
  const winRate = scores.length ? Math.round((wins / scores.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-3xl font-bold text-gray-800">{scores.length}</div>
          <div className="text-sm text-gray-500">Battles Played</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-3xl font-bold text-green-600">{wins}</div>
          <div className="text-sm text-gray-500">Wins</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-3xl font-bold text-red-600">{losses}</div>
          <div className="text-sm text-gray-500">Losses</div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow">
          <div className="text-3xl font-bold text-purple-600">{winRate}%</div>
          <div className="text-sm text-gray-500">Win Rate</div>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Battle History</h2>
          {scores.length > 0 && (
            <button
              onClick={clearScores}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white transition hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </button>
          )}
        </div>

        {scores.length === 0 ? (
          <div className="rounded-lg bg-white/80 p-8 text-center text-gray-500">
            <p className="mb-2 text-lg font-medium">No battles played yet!</p>
            <p>Head over to the Battle Simulator to fight your first battle.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((score) => (
              <ScoreCard key={score.id} score={score} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
