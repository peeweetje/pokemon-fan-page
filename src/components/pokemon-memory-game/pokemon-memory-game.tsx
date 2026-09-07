'use client';

import { difficultySettings } from '@/utils/memory-game-helper';
import { useMemoryGame } from '@/hooks/use-memory-game';
import { ScoreDialog } from './score-dialog';
import { SettingsDialog } from './settings-dialog';
import { SoundToggle } from './sound-toggle';
import { GameStats } from './game-stats';
import { LoadingSpinner } from './loading-spinner';
import { MemoryCard } from './memory-card';

export function PokemonMemoryGame() {
  const {
    // Game state
    cards,
    moves,
    gameOver,
    isLoading,
    showConfetti,
    formattedTime,

    // Settings
    difficulty,
    setDifficulty,
    soundEnabled,
    setSoundEnabled,
    animationsEnabled,
    setAnimationsEnabled,
    selectedCardBack,
    highScores,

    // Computed
    shouldAnimate,
    prefersReducedMotion,

    // Actions
    handleCardClick,
    resetGame,
  } = useMemoryGame();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 px-3 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:px-7 sm:py-8">
      <div className="relative z-10 mb-6 sm:mb-8">
        <div className="mb-5 flex items-start justify-between gap-3">
          <SettingsDialog
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            animationsEnabled={animationsEnabled}
            setAnimationsEnabled={setAnimationsEnabled}
            prefersReducedMotion={prefersReducedMotion}
            onDifficultyChange={resetGame}
          />

          <div className="text-center">
            <h2 className="font-black tracking-tight text-2xl text-slate-950 sm:text-4xl">
              Pokemon Memory Game
            </h2>
            <p className="mt-2 hidden text-sm text-slate-500 sm:block">
              Match every pair before the timer catches you.
            </p>
          </div>
          <SoundToggle
            soundEnabled={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>

        <GameStats moves={moves} formattedTime={formattedTime} difficulty={difficulty} />
      </div>

      <div
        key={`game-grid-${shouldAnimate}`}
        className={`grid gap-2 sm:gap-4 ${
          difficultySettings[difficulty].gridCols === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6'
        } relative z-10 mx-auto w-full max-w-md sm:max-w-none`}
      >
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            difficulty={difficulty}
            selectedCardBack={selectedCardBack}
            shouldAnimate={shouldAnimate}
            onClick={handleCardClick}
          />
        ))}
      </div>

      <ScoreDialog
        isOpen={gameOver}
        moves={moves}
        formattedTime={formattedTime}
        difficulty={difficulty}
        highScores={highScores}
        showConfetti={showConfetti}
        shouldAnimate={shouldAnimate}
        onPlayAgain={resetGame}
      />
    </div>
  );
}

export default PokemonMemoryGame;
