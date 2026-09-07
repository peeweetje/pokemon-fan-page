'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/hooks/use-memory-game';
import { useEffect, useState } from 'react';

const formatDate = (dateString: string) => {
  const parts = dateString.split(/[-/.]/);
  if (parts.length === 3) {
    return `${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[2]}`;
  }
  return dateString;
};

interface HighScore {
  moves: number;
  time: number;
  date: string;
  difficulty: string;
}

interface ScoreDialogProps {
  isOpen: boolean;
  moves: number;
  formattedTime: string;
  difficulty: string;
  highScores: HighScore[];
  showConfetti: boolean;
  shouldAnimate: boolean;
  onPlayAgain: () => void;
}

export function ScoreDialog({
  isOpen,
  moves,
  formattedTime,
  difficulty,
  highScores,
  showConfetti,
  shouldAnimate,
  onPlayAgain,
}: ScoreDialogProps) {
  const [scoreDifficulty, setScoreDifficulty] = useState(difficulty);
  useEffect(() => {
    if (isOpen) setScoreDifficulty(difficulty);
  }, [difficulty, isOpen]);

  if (!isOpen) return null;

  const displayedScores = highScores
    .filter((score) => score.difficulty === scoreDifficulty)
    .sort((a, b) => a.moves - b.moves);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <motion.div
        initial={shouldAnimate ? { scale: 0.9, opacity: 0, y: 20 } : undefined}
        animate={shouldAnimate ? { scale: 1, opacity: 1, y: 0 } : undefined}
        transition={{ type: 'spring', duration: 0.5 }}
          className="mx-2 flex h-[min(680px,calc(100vh-1rem))] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white p-4 text-center shadow-2xl relative sm:max-w-md sm:p-8"
      >
        {/* Keep the celebration inside the score dialog. */}
        {showConfetti && shouldAnimate && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: 0,
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  backgroundColor: [
                    '#FFD700',
                    '#FF69B4',
                    '#00BFFF',
                    '#FF4500',
                    '#32CD32',
                    '#FF1493',
                    '#00FF00',
                    '#FFA500',
                  ][Math.floor(Math.random() * 8)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  boxShadow: '0 0 5px rgba(255,255,255,0.5)',
                }}
                initial={{ y: -32, x: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: [-32, 700],
                  x: [0, Math.random() * 800 - 400],
                  rotate: [0, 1080],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 4,
                  ease: [0.1, 0.9, 0.2, 1],
                  repeat: 0,
                }}
              />
            ))}
          </div>
        )}
        <motion.h3
          initial={shouldAnimate ? { scale: 0.5, opacity: 0 } : undefined}
          animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-3xl font-bold mb-6 text-red-600 flex justify-center relative z-10"
        >
          {'Congratulations!'.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={shouldAnimate ? { y: 0 } : undefined}
              animate={shouldAnimate ? { y: [0, -10, 0] } : undefined}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.05,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h3>
        <motion.div
          initial={shouldAnimate ? { y: 20, opacity: 0 } : undefined}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <p className="text-xl">You completed the game in {moves} moves!</p>
          <p className="text-xl">Time: {formattedTime}</p>
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { y: 20, opacity: 0 } : undefined}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.4 }}
          className="mb-4 flex min-h-0 flex-1 flex-col"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="text-left text-xl font-bold text-gray-700">
                High Scores -{' '}
                {scoreDifficulty.charAt(0).toUpperCase() + scoreDifficulty.slice(1)}
            </h4>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {scoreDifficulty}
            </span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setScoreDifficulty(level)}
                className={`rounded-lg px-2 py-2 text-xs font-bold capitalize transition-colors ${
                  scoreDifficulty === level
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto rounded-xl bg-gray-50 p-4">
            <motion.div
              initial={shouldAnimate ? { x: -20, opacity: 0 } : undefined}
              animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.5 }}
              className="grid min-w-0 grid-cols-4 gap-2 text-sm font-medium text-gray-500 mb-2"
            >
              <div>Rank</div>
              <div>Moves</div>
              <div>Time</div>
              <div>Date</div>
            </motion.div>
            <AnimatePresence>
              {displayedScores.map((score, index) => (
                  <motion.div
                    key={`${score.difficulty}-${index}`}
                    initial={shouldAnimate ? { x: -20, opacity: 0 } : undefined}
                    animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
                    exit={shouldAnimate ? { x: 20, opacity: 0 } : undefined}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="grid min-w-0 grid-cols-4 gap-2 text-sm py-2 border-b border-gray-100 last:border-0"
                  >
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : undefined}
                      animate={shouldAnimate ? { scale: 1 } : undefined}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: 'spring',
                      }}
                      className="font-medium"
                    >
                      #{index + 1}
                    </motion.div>
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : undefined}
                      animate={shouldAnimate ? { scale: 1 } : undefined}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        type: 'spring',
                      }}
                    >
                      {score.moves}
                    </motion.div>
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : undefined}
                      animate={shouldAnimate ? { scale: 1 } : undefined}
                      transition={{
                        delay: 0.9 + index * 0.1,
                        type: 'spring',
                      }}
                    >
                      {formatTime(score.time)}
                    </motion.div>
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : undefined}
                      animate={shouldAnimate ? { scale: 1 } : undefined}
                      transition={{
                        delay: 1 + index * 0.1,
                        type: 'spring',
                      }}
                      className="min-w-0 break-words"
                    >
                      {formatDate(score.date)}
                    </motion.div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { y: 20, opacity: 0 } : undefined}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 1.2 }}
            className="mt-auto flex min-h-[52px] shrink-0 justify-center"
        >
          <Button
            onClick={onPlayAgain}
            variant="primary"
            className="text-lg px-8 py-2"
          >
            Play Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
