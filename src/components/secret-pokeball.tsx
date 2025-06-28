'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { pokemonFacts } from '@/data/pokemon-facts';

function SecretPokeballComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [pokemonFact, setPokemonFact] = useState('');

  useEffect(() => {
    // Randomly decide when to show the Pokeball
    const showPokeball = () => {
      // 30% chance to show the Pokeball when the function is called
      if (Math.random() < 0.3 && !isVisible && !isClicked) {
        // Generate random position within the viewport
        const x = Math.random() * (window.innerWidth - 100); // Subtract Pokeball size
        const y = Math.random() * (window.innerHeight - 100); // Subtract Pokeball size

        // Make sure it's not too close to the edges
        const safeX = Math.max(20, Math.min(x, window.innerWidth - 80));
        const safeY = Math.max(20, Math.min(y, window.innerHeight - 80));

        setPosition({ x: safeX, y: safeY });
        setIsVisible(true);

        // Hide it again after some time if not clicked
        setTimeout(() => {
          if (!isClicked) {
            setIsVisible(false);
          }
        }, 8000);
      }
    };

    // Check periodically if we should show the Pokeball
    const interval = setInterval(showPokeball, 15000);

    // Initial check
    showPokeball();

    return () => clearInterval(interval);
  }, [isVisible, isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    // Select a random Pokemon fact
    const randomFact =
      pokemonFacts[Math.floor(Math.random() * pokemonFacts.length)];
    setPokemonFact(randomFact);

    // Reset after showing the fact
    setTimeout(() => {
      setIsClicked(false);
      setIsVisible(false);
      setPokemonFact('');
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed z-50 cursor-pointer'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{ top: position.y, left: position.x }}
        >
          {!isClicked ? (
            <motion.div
              className='relative'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                },
              }}
              onClick={handleClick}
            >
              <div className='relative filter drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]'>
                <div className='w-16 h-16 rounded-full border-2 border-gray-800 relative overflow-hidden shadow-lg'>
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-400 via-red-500 to-rose-600'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-white via-gray-50 to-slate-100'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800'></div>
                </div>
              </div>
              <motion.div
                className='absolute -top-1 -right-1 text-yellow-400'
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles size={12} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className='bg-white p-4 rounded-lg shadow-lg border-2 border-blue-400 max-w-xs'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className='text-center'
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: 4 }}
              >
                <h4 className='font-bold text-blue-600 mb-2'>Pokémon Fact!</h4>
                <p className='text-gray-700'>{pokemonFact}</p>
              </motion.div>
              <div className='flex justify-center mt-3'>
                <motion.div
                  className='w-8 h-8 rounded-full border-2 border-gray-800 relative overflow-hidden'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 2 }}
                >
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border-2 border-gray-800'></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Create a client-only wrapper that only renders on the client side
export default function SecretPokeball() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return <SecretPokeballComponent />;
}
