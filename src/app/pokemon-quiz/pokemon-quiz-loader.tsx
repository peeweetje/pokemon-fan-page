'use client';

import { motion } from 'framer-motion';

export function PokemonQuizLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        className="relative w-24 h-24"
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-black z-10"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 0 0 rgba(0,0,0,0.1)',
              '0 0 0 10px rgba(0,0,0,0.1)',
              '0 0 0 0 rgba(0,0,0,0.1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 bg-gray-200 rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(255,0,0,0.2)',
              '0 0 20px 10px rgba(255,0,0,0.2)',
              '0 0 0 0 rgba(255,0,0,0.2)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}
