'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BookOpen, Trophy, Sparkles, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SecretPokeball from '@/components/secret-pokeball';
import PokemonGuidesSidebar from '@/app/pokemon-guides/pokemon-guides-sidebar';
import { pokemonGuideSections } from '@/data/pokemon-guides-sections';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen className="w-6 h-6" />;
    case 'Target':
      return <Target className="w-6 h-6" />;
    case 'Zap':
      return <Zap className="w-6 h-6" />;
    case 'Trophy':
      return <Trophy className="w-6 h-6" />;
    case 'Sparkles':
      return <Sparkles className="w-6 h-6" />;
    default:
      return <BookOpen className="w-6 h-6" />;
  }
};

export default function PokemonGuides() {
  const [activeSection, setActiveSection] = useState('tips');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsNavigating] = useState(false);

  const sections = pokemonGuideSections.map((section) => ({
    ...section,
    icon: getIcon(section.icon),
  }));

  return (
    <>
      <PokemonGuidesSidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsNavigating={setIsNavigating}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections
                .find((section) => section.id === activeSection)
                ?.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      rotate: 1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Card className="p-6 relative overflow-hidden h-full group">
                      {/* Dynamic gradient background based on section */}
                      <div
                        className={`absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-30
                        ${
                          activeSection === 'tips'
                            ? 'bg-gradient-to-br from-blue-400 to-purple-400'
                            : activeSection === 'walkthroughs'
                            ? 'bg-gradient-to-br from-green-400 to-teal-400'
                            : activeSection === 'training'
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                            : activeSection === 'competitive'
                            ? 'bg-gradient-to-br from-red-400 to-pink-400'
                            : 'bg-gradient-to-br from-purple-400 to-indigo-400'
                        }`}
                      ></div>

                      {/* Animated Pokeball decoration */}
                      <motion.div
                        className="absolute top-4 right-4 w-16 h-16 opacity-10"
                        animate={{
                          rotate: 360,
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          rotate: {
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                          },
                          scale: {
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          },
                        }}
                      >
                        <div className="w-full h-full rounded-full border-[4px] border-black relative">
                          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black"></div>
                        </div>
                      </motion.div>

                      {/* Floating particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-white opacity-15"
                            animate={{
                              y: [0, -20, 0],
                              x: [0, 10, 0],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.5,
                              ease: 'easeInOut',
                            }}
                            style={{
                              top: `${20 + i * 30}%`,
                              left: `${20 + i * 20}%`,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10">
                        <motion.h3
                          className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {item.title}
                        </motion.h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {item.content}
                        </p>
                      </div>

                      {/* Hover effect overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                      />
                    </Card>
                  </motion.div>
                ))}
            </div>

            {/* Quick Tips Sidebar */}
            <div className="mt-8">
              <Card className="p-6 relative overflow-hidden group">
                {/* Gradient background */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-15
                  group-hover:opacity-70 transition-opacity duration-300"
                ></div>

                {/* Animated Pokeball */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 opacity-10"
                  animate={{
                    rotate: 360,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    },
                    y: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <div className="w-full h-full rounded-full border-[4px] border-black relative">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                  </div>
                </motion.div>

                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    Quick Tips
                  </h2>
                  <ul className="space-y-4">
                    {[
                      'Save your game frequently, especially before important battles.',
                      'Always carry a diverse team of Pokemon with different types.',
                      'Use status moves to gain an advantage in battles.',
                      "Keep your Pokemon's moves diverse to handle different situations.",
                      "Use held items to enhance your Pokemon's abilities.",
                    ].map((tip, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span
                          className="text-blue-600 group-hover/item:text-blue-700 transition-colors duration-300"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.2,
                          }}
                        >
                          •
                        </motion.span>
                        <span className="group-hover/item:text-gray-800 transition-colors duration-300">
                          {tip}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Hover effect overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                />
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </PokemonGuidesSidebar>
      <SecretPokeball />
    </>
  );
}
