'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPokemonImage } from '@/utils/get-pokemon-images';

interface PokemonQuizImageProps {
  category: string;
}

export function PokemonQuizImage({ category }: PokemonQuizImageProps) {
  return (
    <div className="hidden lg:flex w-64 h-64 relative items-center justify-center">
      {/* Decorative Pokeball-style ring */}
      <div className="absolute inset-4 rounded-full bg-linear-to-br from-rose-200 to-amber-100 opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-4 border-white/70 shadow-inner" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-52 h-52"
      >
        <Image
          priority
          src={getPokemonImage(category)}
          alt="Pokemon"
          fill
          className="object-contain drop-shadow-2xl absolute"
        />
      </motion.div>
    </div>
  );
}
