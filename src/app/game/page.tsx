'use client';

import { PokemonMemoryGame } from '@/components/pokemon-memory-game';
import BackButton from '@/components/back-button';
import { motion, useReducedMotion } from 'framer-motion';
import SecretPokeball from '@/components/secret-pokeball';

export default function GamePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="max-w-6xl mx-auto p-4">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
        animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
        className="mb-6"
      >
        <BackButton />
      </motion.div>
      <PokemonMemoryGame />
      <SecretPokeball />
    </main>
  );
}
