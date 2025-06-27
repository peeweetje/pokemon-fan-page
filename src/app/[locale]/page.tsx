'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Swords, BookOpen } from 'lucide-react';
import Enhanced3DPokeball from '@/components/pokeball-three';
import { useTranslations } from 'next-intl';

type Pokeball = {
  id: number;
  top: string;
  left: string;
  right: string;
  opacity: number;
};

// Client-side only component for background pokeballs
function BackgroundPokeballs() {
  const [pokeballs, setPokeballs] = useState<Pokeball[]>([]);

  useEffect(() => {
    // Generate random positions only on the client side
    const balls = [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      right: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setPokeballs(balls);
  }, []);

  return (
    <div className='absolute inset-0 z-0 opacity-10'>
      {pokeballs.map((ball) => (
        <div
          key={ball.id}
          className='absolute rounded-full border-8 border-white bg-gray-500 w-50 h-50'
          style={{
            top: ball.top,
            left: ball.left,
            opacity: ball.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const t = useTranslations('HomePage');
  const [rotation, setRotation] = useState(0);
  const [isLoading] = useState(false);

  // Slowly rotate the pokeball
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-500 to-red-600 text-white'>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
          >
            <motion.div
              className='relative w-24 h-24'
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
              {/* Outer Pokeball */}
              <div className='absolute inset-0 rounded-full border-8 border-black overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
              </div>

              {/* Center Button */}
              <motion.div
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-black z-10'
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
                {/* Button Shine */}
                <div className='absolute top-1 left-1 w-2 h-2 bg-gray-200 rounded-full'></div>
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className='absolute inset-0 rounded-full'
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
          </motion.div>
        )}
      </AnimatePresence>

      <section className='relative overflow-hidden'>
        <BackgroundPokeballs />
        <div className='container mx-auto px-6 py-16 relative z-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='md:w-1/2'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className='text-5xl md:text-7xl font-extrabold mb-4 tracking-tight'>
                  {t('hero-header')}
                </h1>
                <p className='text-xl md:text-2xl mb-8 text-red-100'>
                  {t('hero-title')}
                </p>

                <Link
                  href='/pokedex'
                  className='inline-flex items-center justify-center bg-yellow-500 text-black hover:bg-yellow-400 font-bold text-base px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2'
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center'
                  >
                    {t('hero-open-pokedex')}
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            <div className='md:w-1/2 flex justify-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ transform: `rotate(${rotation}deg)` }}
                className='relative'
              >
                <div className='w-64 h-64 md:w-80 md:h-80 rounded-full bg-white border-[16px] border-black relative overflow-hidden'>
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-8 border-black z-10'></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white text-gray-800 py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
            {t('main-title')}
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              className='bg-red-50 p-6 rounded-xl shadow-lg'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className='bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4'>
                <Star className='h-8 w-8 text-red-500' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Complete Pokédex</h3>
              <p className='text-gray-600'>
                Browse through all Pokémon with detailed information about each
                species.
              </p>
              <Link
                href='/pokedex'
                className='text-red-500 hover:text-red-600 font-medium mt-4 inline-block'
              >
                Go to Pokédex →
              </Link>
            </motion.div>

            <motion.div
              className='bg-blue-50 p-6 rounded-xl shadow-lg'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4'>
                <Star className='h-8 w-8 text-blue-500' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Memory Game</h3>
              <p className='text-gray-600'>
                Test your memory with our fun Pokémon memory matching game.
              </p>
              <Link
                href='/game'
                className='text-blue-500 hover:text-blue-600 font-medium mt-4 inline-block'
              >
                Play Now →
              </Link>
            </motion.div>

            <motion.div
              className='bg-yellow-50 p-6 rounded-xl shadow-lg'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className='bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-4'>
                <Star className='h-8 w-8 text-yellow-500' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Evolution Groups</h3>
              <p className='text-gray-600'>
                Explore Pokemon evolution chains and discover how your favorite
                Pokemon evolve.
              </p>
              <Link
                href='/evolution-groups'
                className='text-yellow-500 hover:text-yellow-600 font-medium mt-4 inline-block'
              >
                View Evolutions →
              </Link>
            </motion.div>

            <motion.div
              className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className='bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner'>
                <Swords className='h-8 w-8 text-green-600' />
              </div>
              <h3 className='text-2xl font-bold mb-3 text-green-800'>
                Battle Simulator
              </h3>
              <p className='text-gray-700 text-lg leading-relaxed'>
                Experience Pokemon battles in real-time! Choose your Pokemon and
                battle against wild Pokemon.
              </p>
              <Link
                href='/battle-simulator'
                className='text-green-600 hover:text-green-700 font-semibold mt-6 inline-block text-lg transition-colors duration-200'
              >
                Start Battle →
              </Link>
            </motion.div>

            <motion.div
              className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className='bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner'>
                <Star className='h-8 w-8 text-purple-600' />
              </div>
              <h3 className='text-2xl font-bold mb-3 text-purple-800'>
                Pokemon Quiz
              </h3>
              <p className='text-gray-700 text-lg leading-relaxed'>
                Test your Pokemon knowledge with our interactive quiz! Answer
                questions about Pokemon types, evolutions, and more.
              </p>
              <Link
                href='/pokemon-quiz'
                className='text-purple-600 hover:text-purple-700 font-semibold mt-6 inline-block text-lg transition-colors duration-200'
              >
                Take Quiz →
              </Link>
            </motion.div>

            <motion.div
              className='bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-200'
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className='bg-gradient-to-br from-teal-100 to-teal-200 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner'>
                <BookOpen className='h-8 w-8 text-teal-600' />
              </div>
              <h3 className='text-2xl font-bold mb-3 text-teal-800'>
                Pokemon Guides
              </h3>
              <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                Master Pokemon with our comprehensive guides! Learn about EV/IV
                training, competitive battling, shiny hunting, and more.
              </p>
              <Link
                href='/pokemon-guides'
                className='text-teal-600 hover:text-teal-700 font-semibold inline-block text-lg transition-colors duration-200'
              >
                Read Guides →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-br from-blue-500 to-blue-600 py-16'>
        <div className='container mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to become a Pokémon Master?
            </h2>
            <p className='text-xl mb-8 max-w-2xl mx-auto'>
              Start your journey by exploring our comprehensive Pokédex, test
              your memory with our game, and learn about all your favorite
              Pokémon.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/pokedex'
                className='bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full'
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center'
                >
                  {'Open Pokédex'} <ChevronRight className='ml-2 h-4 w-4' />
                </motion.span>
              </Link>

              <Link
                href='/game'
                className='inline-flex items-center justify-center bg-yellow-500 text-black hover:bg-yellow-400 font-bold text-base px-6 py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2'
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-flex items-center'
                >
                  {'Play Memory Game'} <ChevronRight className='ml-2 h-4 w-4' />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-8'>
        <div className='container mx-auto px-6 text-center'>
          <p>
            © {new Date().getFullYear()} Pokémon Explorer. All rights reserved.
          </p>
          <p className='text-gray-400 text-sm mt-2'>
            Pokémon and Pokémon character names are trademarks of Nintendo.
          </p>
        </div>
        <Enhanced3DPokeball />
      </footer>
    </div>
  );
}
