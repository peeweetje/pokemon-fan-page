'use client';

import { motion } from 'framer-motion';

interface PokemonNameProps {
  name: string;
  isClicked: boolean;
}

export function PokemonName({ name, isClicked }: PokemonNameProps) {
  return (
    <motion.h3
      className="font-semibold capitalize text-neutral-800 text-center mb-1"
      animate={
        isClicked
          ? {
              scale: [1, 1.1, 0],
              transition: { duration: 0.4, times: [0, 0.2, 1] },
            }
          : {}
      }
    >
      {name}
    </motion.h3>
  );
}
