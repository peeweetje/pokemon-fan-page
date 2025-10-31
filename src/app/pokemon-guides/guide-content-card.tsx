import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AnimatedPokeball from '@/app/pokemon-guides/animated-pokeball';
import FloatingParticles from '@/app/pokemon-guides/floating-particles';

interface GuideContentCardProps {
  title: string;
  content: string;
  activeSection: string;
  index: number;
}

export default function GuideContentCard({
  title,
  content,
  activeSection,
  index,
}: GuideContentCardProps) {
  return (
    <motion.div
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
        <AnimatedPokeball
          size="medium"
          className="absolute top-4 right-4 opacity-10"
          animationType="rotate-scale"
        />

        {/* Floating particles */}
        <FloatingParticles />

        <div className="relative z-10">
          <motion.h3
            className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {content}
          </p>
        </div>

        {/* Hover effect overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
        />
      </Card>
    </motion.div>
  );
}
