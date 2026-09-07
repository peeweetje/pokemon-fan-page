'use client';

import { PokemonMemoryGame } from '@/components/pokemon-memory-game/pokemon-memory-game';
import BackButton from '@/components/back-button';
import { motion, useReducedMotion } from 'framer-motion';
import SecretPokeball from '@/components/secret-pokeball';

export default function GamePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7f2] px-3 py-4 text-slate-950 sm:px-6 sm:py-6">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
        animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
        className="mx-auto mb-4 max-w-7xl sm:mb-6"
      >
        <BackButton />
      </motion.div>
      <PokemonMemoryGame />
      <SecretPokeball />
    </main>
  );
}
