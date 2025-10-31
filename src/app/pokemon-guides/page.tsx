'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BookOpen, Trophy, Sparkles, Zap, Target } from 'lucide-react';
import SecretPokeball from '@/components/secret-pokeball';
import PokemonGuidesSidebar from '@/app/pokemon-guides/pokemon-guides-sidebar';
import GuideContentCard from '@/app/pokemon-guides/guide-content-card';
import QuickTips from '@/app/pokemon-guides/quick-tips';
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
                  <GuideContentCard
                    key={index}
                    title={item.title}
                    content={item.content}
                    activeSection={activeSection}
                    index={index}
                  />
                ))}
            </div>

            <QuickTips />
          </motion.div>
        </AnimatePresence>
      </PokemonGuidesSidebar>
      <SecretPokeball />
    </>
  );
}
