'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import BackgroundPokeballs from './background-pokeballs';
import HeroPokeball from './hero-pokeball';

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

const TITLE_WORDS = ['Pokémon', 'Adventure'];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <BackgroundPokeballs />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                aria-label="Pokémon Adventure"
                className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
              >
                {TITLE_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    aria-hidden="true"
                    initial={reduceMotion ? false : { opacity: 0, y: 30, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.15 + i * 0.12,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="inline-block mr-4 last:mr-0"
                    data-testid={`hero-title-word-${i}`}
                  >
                    {i === 1 ? (
                      <motion.span
                        animate={
                          reduceMotion
                            ? undefined
                            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                        }
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 bg-[length:200%_auto] bg-clip-text text-transparent"
                      >
                        {word}
                      </motion.span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: reduceMotion ? 0 : 0.6, duration: 0.7 }}
                className="text-xl md:text-2xl mb-8 text-red-100"
              >
                Discover your next favorite Pokémon and explore the world of trainers.
              </motion.p>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        boxShadow: [
                          '0 0 0 0 rgba(250,204,21,0.5)',
                          '0 0 0 16px rgba(250,204,21,0)',
                        ],
                      }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                className="inline-block rounded-full"
                data-testid="hero-cta-pulse"
              >
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 rounded-full"
                  onClick={() => onNavigate('/pokedex')}
                >
                  View Pokédex <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <HeroPokeball />
          </div>
        </div>
      </div>
    </section>
  );
}
