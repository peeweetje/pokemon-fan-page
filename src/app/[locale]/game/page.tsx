'use client';

import { PokemonMemoryGame } from '@/components/pokemon-memory-game';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import SecretPokeball from '@/components/secret-pokeball';

export default function GamePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className='max-w-6xl mx-auto p-4'>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
        animate={prefersReducedMotion ? false : { opacity: 1, x: 0 }}
        className='mb-6'
      >
        <Link
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          href='/'
        >
          <ChevronLeft className='h-4 w-4' />
          Back to Home
        </Link>
      </motion.div>
      <PokemonMemoryGame />
      <SecretPokeball />
    </main>
  );
}
