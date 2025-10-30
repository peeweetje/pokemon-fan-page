'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BackButton from '@/components/back-button';
import {
  BookOpen,
  Trophy,
  Sparkles,
  Zap,
  Target,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import SecretPokeball from '@/components/secret-pokeball';
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
    <div className="min-h-screen bg-white">
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 flex"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`relative w-64 h-full shadow-xl p-4 flex flex-col
                ${
                  activeSection === 'tips'
                    ? 'bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50'
                    : activeSection === 'walkthroughs'
                    ? 'bg-gradient-to-b from-green-50 via-teal-50 to-emerald-50'
                    : activeSection === 'training'
                    ? 'bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-50'
                    : activeSection === 'competitive'
                    ? 'bg-gradient-to-b from-red-50 via-pink-50 to-rose-50'
                    : 'bg-gradient-to-b from-purple-50 via-indigo-50 to-violet-50'
                }
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
                <div
                  className={`absolute top-10 left-10 w-20 h-20 rounded-full ${
                    activeSection === 'tips'
                      ? 'bg-blue-400'
                      : activeSection === 'walkthroughs'
                      ? 'bg-green-400'
                      : activeSection === 'training'
                      ? 'bg-yellow-400'
                      : activeSection === 'competitive'
                      ? 'bg-red-400'
                      : 'bg-purple-400'
                  } animate-float`}
                ></div>
                <div
                  className={`absolute bottom-20 right-10 w-16 h-16 rounded-full ${
                    activeSection === 'tips'
                      ? 'bg-purple-400'
                      : activeSection === 'walkthroughs'
                      ? 'bg-teal-400'
                      : activeSection === 'training'
                      ? 'bg-orange-400'
                      : activeSection === 'competitive'
                      ? 'bg-pink-400'
                      : 'bg-indigo-400'
                  } animate-float-delayed`}
                ></div>
                <div
                  className={`absolute top-1/2 left-1/2 w-24 h-24 rounded-full ${
                    activeSection === 'tips'
                      ? 'bg-pink-400'
                      : activeSection === 'walkthroughs'
                      ? 'bg-emerald-400'
                      : activeSection === 'training'
                      ? 'bg-amber-400'
                      : activeSection === 'competitive'
                      ? 'bg-rose-400'
                      : 'bg-violet-400'
                  } animate-float-slow`}
                ></div>
              </div>
              {/* Drawer content */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-bold text-lg">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? 'default' : 'ghost'}
                    className={`justify-start gap-2 w-full ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${
                            section.id === 'tips'
                              ? 'from-blue-400 to-purple-400'
                              : section.id === 'walkthroughs'
                              ? 'from-green-400 to-teal-400'
                              : section.id === 'training'
                              ? 'from-yellow-400 to-orange-400'
                              : section.id === 'competitive'
                              ? 'from-red-400 to-pink-400'
                              : 'from-purple-400 to-indigo-400'
                          } text-white shadow-lg`
                        : ''
                    }`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-auto pt-8 relative z-10">
                <BackButton
                  onClick={() => {
                    setIsNavigating(true);
                  }}
                  className="w-full gap-1"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Sidebar */}
      <SidebarProvider>
        <Sidebar className="border-r hidden md:flex">
          <SidebarHeader className="p-0">
            <div className="p-4 border-b border-gray-200/50">
              <BackButton
                onClick={() => {
                  setIsNavigating(true);
                }}
                className={`gap-1 w-full justify-start transition-all duration-300 hover:scale-105 cursor-pointer ${
                  activeSection === 'tips'
                    ? 'bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white'
                    : activeSection === 'walkthroughs'
                    ? 'bg-gradient-to-r from-green-400/80 to-teal-400/80 hover:from-green-400 hover:to-teal-400 text-white'
                    : activeSection === 'training'
                    ? 'bg-gradient-to-r from-yellow-400/80 to-orange-400/80 hover:from-yellow-400 hover:to-orange-400 text-white'
                    : activeSection === 'competitive'
                    ? 'bg-gradient-to-r from-red-400/80 to-pink-400/80 hover:from-red-400 hover:to-pink-400 text-white'
                    : 'bg-gradient-to-r from-purple-400/80 to-indigo-400/80 hover:from-purple-400 hover:to-indigo-400 text-white'
                }`}
              />
            </div>
          </SidebarHeader>

          <SidebarContent
            className={`relative ${
              activeSection === 'tips'
                ? 'bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50'
                : activeSection === 'walkthroughs'
                ? 'bg-gradient-to-b from-green-50 via-teal-50 to-emerald-50'
                : activeSection === 'training'
                ? 'bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-50'
                : activeSection === 'competitive'
                ? 'bg-gradient-to-b from-red-50 via-pink-50 to-rose-50'
                : 'bg-gradient-to-b from-purple-50 via-indigo-50 to-violet-50'
            }`}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <div
                className={`absolute top-10 left-10 w-20 h-20 rounded-full ${
                  activeSection === 'tips'
                    ? 'bg-blue-400'
                    : activeSection === 'walkthroughs'
                    ? 'bg-green-400'
                    : activeSection === 'training'
                    ? 'bg-yellow-400'
                    : activeSection === 'competitive'
                    ? 'bg-red-400'
                    : 'bg-purple-400'
                } animate-float`}
              ></div>
              <div
                className={`absolute bottom-20 right-10 w-16 h-16 rounded-full ${
                  activeSection === 'tips'
                    ? 'bg-purple-400'
                    : activeSection === 'walkthroughs'
                    ? 'bg-teal-400'
                    : activeSection === 'training'
                    ? 'bg-orange-400'
                    : activeSection === 'competitive'
                    ? 'bg-pink-400'
                    : 'bg-indigo-400'
                } animate-float-delayed`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 w-24 h-24 rounded-full ${
                  activeSection === 'tips'
                    ? 'bg-pink-400'
                    : activeSection === 'walkthroughs'
                    ? 'bg-emerald-400'
                    : activeSection === 'training'
                    ? 'bg-amber-400'
                    : activeSection === 'competitive'
                    ? 'bg-rose-400'
                    : 'bg-violet-400'
                } animate-float-slow`}
              ></div>
            </div>

            <ScrollArea className="h-[calc(100vh-80px)]">
              <SidebarMenu className="p-4 space-y-2">
                {sections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        variant={
                          activeSection === section.id ? 'default' : 'ghost'
                        }
                        className={`w-full justify-start gap-2 transition-all duration-300 ${
                          activeSection === section.id
                            ? `bg-gradient-to-r ${
                                section.id === 'tips'
                                  ? 'from-blue-400 to-purple-400'
                                  : section.id === 'walkthroughs'
                                  ? 'from-green-400 to-teal-400'
                                  : section.id === 'training'
                                  ? 'from-yellow-400 to-orange-400'
                                  : section.id === 'competitive'
                                  ? 'from-red-400 to-pink-400'
                                  : 'from-purple-400 to-indigo-400'
                              } hover:opacity-90 text-white shadow-lg`
                            : 'hover:bg-white/80 backdrop-blur-sm'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <motion.div
                          animate={{
                            rotate: activeSection === section.id ? 360 : 0,
                            scale: activeSection === section.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {section.icon}
                        </motion.div>
                        <span className="font-medium">{section.title}</span>
                      </Button>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>

            {/* Decorative Pokeball */}
            <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
                className="w-full h-full"
              >
                <div className="w-full h-full rounded-full border-[3px] border-black relative">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-black"></div>
                </div>
              </motion.div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="bg-white">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Responsive header: menu button next to title on mobile */}
                <div className="flex items-center mb-8">
                  <div className="md:hidden mr-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(true)}
                      className="rounded-full shadow bg-white/90"
                      aria-label="Open menu"
                    >
                      <Menu className="w-7 h-7" />
                    </Button>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {sections.find((s) => s.id === activeSection)?.title}
                  </h1>
                </div>

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
          </div>
        </SidebarInset>
      </SidebarProvider>
      <SecretPokeball />
    </div>
  );
}
