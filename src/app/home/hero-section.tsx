import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import BackgroundPokeballs from './background-pokeballs';

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <BackgroundPokeballs />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                Pokémon Explorer
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100">
                Your ultimate guide to the world of Pokémon
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-6 rounded-full"
                  onClick={() => onNavigate('/pokedex')}
                >
                  Open Pokédex <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white border-[16px] border-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-8 border-black z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
