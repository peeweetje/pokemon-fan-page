'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cardBacks, difficultySettings } from '@/utils/memory-game-helper';
import { useMemoryGame, formatTime } from '@/hooks/use-memory-game';

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      {/* Confetti */}
      {showConfetti && shouldAnimate && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
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
              }}
              initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: ['100vh'],
                x: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                ease: 'linear',
                repeat: 0,
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full p-2 sm:p-4 h-12 w-12 sm:h-16 sm:w-16"
              >
                <Settings className="h-6 w-6 sm:h-12 sm:w-12" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Game Settings</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Difficulty</h4>
                  <div className="flex justify-center gap-2 sm:gap-4">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <Button
                        key={level}
                        onClick={() => {
                          setDifficulty(level);
                          resetGame();
                        }}
                        variant={difficulty === level ? 'default' : 'outline'}
                        className="text-xs sm:text-sm px-2 sm:px-4"
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-toggle" className="text-sm font-medium">
                    Sound Effects
                  </Label>
                  <Switch
                    id="sound-toggle"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="animations-toggle"
                    className="text-sm font-medium"
                  >
                    Animations
                  </Label>
                  <Switch
                    id="animations-toggle"
                    checked={animationsEnabled}
                    onCheckedChange={setAnimationsEnabled}
                    disabled={prefersReducedMotion}
                  />
                </div>
                {prefersReducedMotion && (
                  <p className="text-xs text-gray-500 text-center">
                    Animations are disabled due to system preferences
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <h2 className="text-lg sm:text-2xl font-bold">Pokemon Memory Game</h2>
          <Button
            variant="ghost"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full p-2 sm:p-4 h-12 w-12 sm:h-16 sm:w-16"
          >
            {soundEnabled ? (
              <Volume2 className="h-6 w-6 sm:h-12 sm:w-12" />
            ) : (
              <VolumeX className="h-6 w-6 sm:h-12 sm:w-12" />
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-sm sm:text-base text-gray-600">
          <p>Moves: {moves}</p>
          <p>Time: {formattedTime}</p>
          <p>
            Difficulty:{' '}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </p>
        </div>
      </div>

      <div
        key={`game-grid-${shouldAnimate}`}
        className={`grid gap-2 sm:gap-4 ${
          difficultySettings[difficulty].gridCols === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6'
        } max-w-sm sm:max-w-none mx-auto`}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="aspect-square min-h-[120px] sm:min-h-[100px]"
            whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
            whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
          >
            <Card
              className={`h-full cursor-pointer relative ${
                card.isMatched ? 'ring-4 ring-green-500 shadow-lg' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <AnimatePresence mode="wait">
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    key="front"
                    initial={shouldAnimate ? { rotateY: 90 } : undefined}
                    animate={shouldAnimate ? { rotateY: 0 } : undefined}
                    exit={shouldAnimate ? { rotateY: 90 } : undefined}
                    className="w-full h-full flex items-center justify-center p-2 bg-white"
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.pokemonId}.png`}
                      alt={`Pokemon ${card.pokemonId}`}
                      width={100}
                      height={100}
                      className="object-contain w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={shouldAnimate ? { rotateY: 90 } : undefined}
                    animate={shouldAnimate ? { rotateY: 0 } : undefined}
                    exit={shouldAnimate ? { rotateY: 90 } : undefined}
                    className={`w-full h-full ${cardBacks[difficulty][selectedCardBack]} rounded-3xl flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Fun star pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.1-6.6-9.1 6.6 3.5-10.8-9.1-6.6h11.3z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                          backgroundSize: '30px 30px',
                        }}
                      ></div>
                    </div>

                    {/* Bouncy Pokeball */}
                    <motion.div
                      className="relative w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center"
                      animate={
                        shouldAnimate
                          ? {
                              y: [0, -5, 0],
                              scale: [1, 1.05, 1],
                            }
                          : undefined
                      }
                      transition={
                        shouldAnimate
                          ? {
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: 'easeInOut',
                            }
                          : undefined
                      }
                    >
                      {/* Pokeball outer circle */}
                      <div className="absolute w-full h-full rounded-full border-2 sm:border-4 border-black shadow-[0_0_15px_rgba(0,0,0,0.3)]"></div>
                      {/* Pokeball top half (white) */}
                      <div className="absolute w-full h-1/2 top-0 rounded-t-full bg-white"></div>
                      {/* Pokeball bottom half (red) */}
                      <div className="absolute w-full h-1/2 bottom-0 rounded-b-full bg-red-600"></div>
                      {/* Pokeball middle line */}
                      <div className="absolute w-full h-0.5 sm:h-1 top-1/2 -translate-y-1/2 bg-black"></div>
                      {/* Pokeball center circle with playful shine */}
                      <div className="absolute w-3 h-3 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-black bg-white">
                        <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/50"></div>
                      </div>
                    </motion.div>

                    {/* Playful corner elements */}
                    <div
                      className={`absolute top-1 left-1 sm:top-3 sm:left-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                        shouldAnimate ? 'animate-pulse' : ''
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1 right-1 sm:top-3 sm:right-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                        shouldAnimate ? 'animate-pulse' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '0.5s' } : undefined
                      }
                    ></div>
                    <div
                      className={`absolute bottom-1 left-1 sm:bottom-3 sm:left-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                        shouldAnimate ? 'animate-pulse' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '1s' } : undefined
                      }
                    ></div>
                    <div
                      className={`absolute bottom-1 right-1 sm:bottom-3 sm:right-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                        shouldAnimate ? 'animate-pulse' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '1.5s' } : undefined
                      }
                    ></div>

                    {/* Fun sparkle effects */}
                    <div
                      className={`absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                        shouldAnimate ? 'animate-ping' : ''
                      }`}
                    ></div>
                    <div
                      className={`absolute top-1/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                        shouldAnimate ? 'animate-ping' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '0.3s' } : undefined
                      }
                    ></div>
                    <div
                      className={`absolute bottom-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                        shouldAnimate ? 'animate-ping' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '0.6s' } : undefined
                      }
                    ></div>
                    <div
                      className={`absolute bottom-1/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                        shouldAnimate ? 'animate-ping' : ''
                      }`}
                      style={
                        shouldAnimate ? { animationDelay: '0.9s' } : undefined
                      }
                    ></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <motion.div
            initial={
              shouldAnimate ? { scale: 0.9, opacity: 0, y: 20 } : undefined
            }
            animate={shouldAnimate ? { scale: 1, opacity: 1, y: 0 } : undefined}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white p-4 sm:p-8 rounded-2xl text-center max-w-sm sm:max-w-md w-full shadow-2xl relative overflow-hidden mx-2"
          >
            {/* Confetti container positioned relative to the modal */}
            {showConfetti && shouldAnimate && (
              <div className="absolute inset-0 pointer-events-none z-[9999]">
                {[...Array(100)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: 200,
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
                    initial={{ y: 200, x: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      y: [-400, 100],
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
              className="text-3xl font-bold mb-6 text-blue-600 flex justify-center relative z-10"
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
              <p className="text-xl">
                You completed the game in {moves} moves!
              </p>
              <p className="text-xl">Time: {formattedTime}</p>
            </motion.div>

            <motion.div
              initial={shouldAnimate ? { y: 20, opacity: 0 } : undefined}
              animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h4 className="font-bold text-xl mb-4 text-gray-700">
                High Scores -{' '}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </h4>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <motion.div
                  initial={shouldAnimate ? { x: -20, opacity: 0 } : undefined}
                  animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-500 mb-2"
                >
                  <div>Rank</div>
                  <div>Moves</div>
                  <div>Time</div>
                  <div>Date</div>
                </motion.div>
                <AnimatePresence>
                  {highScores
                    .filter((score) => score.difficulty === difficulty)
                    .sort((a, b) => a.moves - b.moves)
                    .map((score, index) => (
                      <motion.div
                        key={`${score.difficulty}-${index}`}
                        initial={
                          shouldAnimate ? { x: -20, opacity: 0 } : undefined
                        }
                        animate={
                          shouldAnimate ? { x: 0, opacity: 1 } : undefined
                        }
                        exit={shouldAnimate ? { x: 20, opacity: 0 } : undefined}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-100 last:border-0"
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
                        >
                          {score.date}
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
              className="flex justify-center"
            >
              <Button
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-2"
              >
                Play Again
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default PokemonMemoryGame;
