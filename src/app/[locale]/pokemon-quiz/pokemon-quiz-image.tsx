'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPokemonImage } from '@/utils/get-pokemon-images';

interface PokemonQuizImageProps {
  category: string;
}

export function PokemonQuizImage({ category }: PokemonQuizImageProps) {
  return (
    <div className="hidden lg:block w-64 h-64 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
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
