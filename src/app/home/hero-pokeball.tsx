'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface HeroPokeballProps {
  size?: 'md' | 'lg';
  spinDuration?: number;
}

export default function HeroPokeball({ size = 'lg', spinDuration = 4 }: HeroPokeballProps) {
  const reduceMotion = useReducedMotion();
  const sizeClasses = size === 'lg' ? 'w-64 h-64 md:w-80 md:h-80' : 'w-48 h-48 md:w-64 md:h-64';
  const buttonClasses = size === 'lg' ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-16 md:h-16';

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
      data-testid="hero-pokeball"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        data-testid="hero-pokeball-float"
        className="relative"
      >
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: spinDuration, repeat: Infinity, ease: 'linear' }}
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          className={`${sizeClasses} rounded-full bg-white border-[16px] border-black relative overflow-hidden`}
          data-testid="hero-pokeball-spinner"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
          <div className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 bg-black" />
        </motion.div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${buttonClasses} bg-white rounded-full border-8 border-black z-10 pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
}
