import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  return (
    <motion.div
      className="aspect-square min-h-[120px] sm:min-h-[100px]"
      whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
      whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
    >
      <Card
        className={`h-full cursor-pointer relative ${
          card.isMatched ? 'ring-4 ring-green-500 shadow-lg' : ''
        }`}
        onClick={() => onClick(card.id)}
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
                style={shouldAnimate ? { animationDelay: '0.5s' } : undefined}
              ></div>
              <div
                className={`absolute bottom-1 left-1 sm:bottom-3 sm:left-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                  shouldAnimate ? 'animate-pulse' : ''
                }`}
                style={shouldAnimate ? { animationDelay: '1s' } : undefined}
              ></div>
              <div
                className={`absolute bottom-1 right-1 sm:bottom-3 sm:right-3 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/30 ${
                  shouldAnimate ? 'animate-pulse' : ''
                }`}
                style={shouldAnimate ? { animationDelay: '1.5s' } : undefined}
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
                style={shouldAnimate ? { animationDelay: '0.3s' } : undefined}
              ></div>
              <div
                className={`absolute bottom-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                  shouldAnimate ? 'animate-ping' : ''
                }`}
                style={shouldAnimate ? { animationDelay: '0.6s' } : undefined}
              ></div>
              <div
                className={`absolute bottom-1/4 right-1/4 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white/40 ${
                  shouldAnimate ? 'animate-ping' : ''
                }`}
                style={shouldAnimate ? { animationDelay: '0.9s' } : undefined}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
