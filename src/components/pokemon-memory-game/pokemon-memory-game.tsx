'use client';

import { difficultySettings } from '@/utils/memory-game-helper';
import { useMemoryGame } from '@/hooks/use-memory-game';
import { ScoreDialog } from './score-dialog';
import { SettingsDialog } from './settings-dialog';
import { SoundToggle } from './sound-toggle';
import { GameStats } from './game-stats';
import { LoadingSpinner } from './loading-spinner';
import { ConfettiEffect } from './confetti-effect';
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
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      <ConfettiEffect
        showConfetti={showConfetti}
        shouldAnimate={shouldAnimate}
      />

      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
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

          <h2 className="text-lg sm:text-2xl font-bold">Pokemon Memory Game</h2>
          <SoundToggle
            soundEnabled={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>

        <GameStats
          moves={moves}
          formattedTime={formattedTime}
          difficulty={difficulty}
        />
      </div>

      <div
        key={`game-grid-${shouldAnimate}`}
        className={`grid gap-2 sm:gap-4 ${
          difficultySettings[difficulty].gridCols === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6'
        } w-full max-w-md sm:max-w-none mx-auto`}
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
