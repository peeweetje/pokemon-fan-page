'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cardBacks, Difficulty } from '@/utils/memory-game-helper';

interface CardState {
  id: number;
  pokemonId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardProps {
  card: CardState;
  difficulty: Difficulty;
  selectedCardBack: number;
  shouldAnimate: boolean;
  onClick: (cardId: number) => void;
}

export function MemoryCard({
  card,
  difficulty,
  selectedCardBack,
  shouldAnimate,
  onClick,
}: MemoryCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const isShowingFront = card.isFlipped || card.isMatched;
  const pokemonImageSources = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${card.pokemonId}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${card.pokemonId}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.pokemonId}.png`,
  ];
  const currentPokemonImage = pokemonImageSources[Math.min(imageIndex, pokemonImageSources.length - 1)];

  return (
    <motion.div
      className="aspect-square min-h-[112px] sm:min-h-[100px]"
      whileHover={shouldAnimate ? { scale: 1.04 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <Card
        className={`relative h-full cursor-pointer rounded-[1.25rem] border-0 bg-transparent p-0 shadow-none ${
          card.isMatched
            ? 'ring-4 ring-green-500/80 ring-offset-2 ring-offset-white shadow-[0_0_28px_rgba(16,185,129,0.25)]'
            : ''
        }`}
        onClick={() => onClick(card.id)}
      >
        <div className="relative h-full w-full [perspective:1200px]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={
              shouldAnimate ? { rotateY: isShowingFront ? 180 : 0 } : undefined
            }
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 18,
              mass: 0.85,
            }}
          >
            {!isShowingFront && (
              <div
                className={`absolute inset-0 [backface-visibility:hidden] ${
                  cardBacks[difficulty][selectedCardBack]
                } overflow-hidden rounded-[1.25rem] border-4 border-white/40 shadow-[0_10px_20px_rgba(15,23,42,0.16)]`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.1-6.6-9.1 6.6 3.5-10.8-9.1-6.6h11.3z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                      backgroundSize: '28px 28px',
                    }}
                  ></div>
                </div>

                <motion.div
                  className="relative z-10 flex h-full w-full items-center justify-center"
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
                  <div className="relative h-11 w-11 rotate-[-8deg] drop-shadow-[0_8px_8px_rgba(15,23,42,0.24)] transition-transform sm:h-16 sm:w-16">
                    <div className="absolute inset-0 rounded-full border-2 border-black shadow-[0_0_15px_rgba(0,0,0,0.3)] sm:border-4"></div>
                    <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-white"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full bg-red-600"></div>
                    <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-black sm:h-1"></div>
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white sm:h-6 sm:w-6 sm:border-4">
                      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 sm:h-1.5 sm:w-1.5"></div>
                    </div>
                  </div>
                </motion.div>

                <div
                  className={`absolute left-1 top-1 h-2 w-2 rounded-full bg-white/30 sm:left-3 sm:top-3 sm:h-4 sm:w-4 ${
                    shouldAnimate ? 'animate-pulse' : ''
                  }`}
                ></div>
                <div
                  className={`absolute right-1 top-1 h-2 w-2 rounded-full bg-white/30 sm:right-3 sm:top-3 sm:h-4 sm:w-4 ${
                    shouldAnimate ? 'animate-pulse' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '0.5s' } : undefined}
                ></div>
                <div
                  className={`absolute bottom-1 left-1 h-2 w-2 rounded-full bg-white/30 sm:bottom-3 sm:left-3 sm:h-4 sm:w-4 ${
                    shouldAnimate ? 'animate-pulse' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '1s' } : undefined}
                ></div>
                <div
                  className={`absolute bottom-1 right-1 h-2 w-2 rounded-full bg-white/30 sm:bottom-3 sm:right-3 sm:h-4 sm:w-4 ${
                    shouldAnimate ? 'animate-pulse' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '1.5s' } : undefined}
                ></div>

                <div
                  className={`absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-white/40 sm:h-2 sm:w-2 ${
                    shouldAnimate ? 'animate-ping' : ''
                  }`}
                ></div>
                <div
                  className={`absolute right-1/4 top-1/4 h-1 w-1 rounded-full bg-white/40 sm:h-2 sm:w-2 ${
                    shouldAnimate ? 'animate-ping' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '0.3s' } : undefined}
                ></div>
                <div
                  className={`absolute bottom-1/4 left-1/4 h-1 w-1 rounded-full bg-white/40 sm:h-2 sm:w-2 ${
                    shouldAnimate ? 'animate-ping' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '0.6s' } : undefined}
                ></div>
                <div
                  className={`absolute bottom-1/4 right-1/4 h-1 w-1 rounded-full bg-white/40 sm:h-2 sm:w-2 ${
                    shouldAnimate ? 'animate-ping' : ''
                  }`}
                  style={shouldAnimate ? { animationDelay: '0.9s' } : undefined}
                ></div>
              </div>
            )}

            {isShowingFront && (
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[1.25rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-100 p-2 shadow-[0_12px_24px_rgba(14,116,144,0.16)]">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1rem] border border-white/90 bg-white/55 backdrop-blur-sm">
                  <span className="absolute left-2 top-2 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-sky-600/60">
                    #{String(card.pokemonId).padStart(3, '0')}
                  </span>
                  <Image
                    src={currentPokemonImage}
                    alt={`Pokemon ${card.pokemonId}`}
                    width={100}
                    height={100}
                    className="h-28 w-28 object-contain drop-shadow-[0_8px_18px_rgba(14,116,144,0.24)] sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                    onError={() => {
                      setImageIndex((current) =>
                        current < pokemonImageSources.length - 1
                          ? current + 1
                          : current,
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
