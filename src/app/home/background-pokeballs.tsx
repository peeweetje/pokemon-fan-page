'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Pokeball = {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  floatDuration: number;
  delay: number;
  rotate: number;
};

// Rendered client-only via next/dynamic(ssr: false) in hero-section.tsx,
// so Math.random() is safe here — this component never SSRs and can
// never cause a hydration mismatch.
function BackgroundPokeballs() {
  const reduceMotion = useReducedMotion();

  const pokeballs = useMemo<Pokeball[]>(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 60 + Math.random() * 80,
        opacity: Math.random() * 0.2 + 0.35,
        driftX: (Math.random() - 0.5) * 120,
        driftY: (Math.random() - 0.5) * 120,
        floatDuration: 6 + Math.random() * 6,
        delay: Math.random() * 3,
        rotate: Math.random() * 360,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      data-testid="background-pokeballs"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {pokeballs.map((ball) => (
        <div
          key={ball.id}
          data-testid="background-pokeball-float"
          className="absolute"
          style={{
            top: ball.top,
            left: ball.left,
            width: ball.size,
            height: ball.size,
            marginLeft: -ball.size / 2,
            marginTop: -ball.size / 2,
            opacity: ball.opacity,
          }}
        >
          <motion.div
            className="h-full w-full"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, ball.driftX, 0], y: [0, ball.driftY, 0] }
            }
            transition={{
              duration: ball.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ball.delay,
            }}
          >
            <div
              data-testid="background-pokeball"
              className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-white shadow-lg"
            >
              <div className="absolute top-0 left-0 h-1/2 w-full bg-white" />
              <div className="absolute bottom-0 left-0 h-1/2 w-full bg-white" />
              <div className="absolute top-1/2 left-0 h-[10%] w-full -translate-y-1/2 bg-white" />
              <div className="absolute top-1/2 left-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-white" />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default BackgroundPokeballs;
