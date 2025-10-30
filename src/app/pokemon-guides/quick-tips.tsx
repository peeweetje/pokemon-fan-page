import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AnimatedPokeball from '@/app/pokemon-guides/animated-pokeball';

const quickTips = [
  'Save your game frequently, especially before important battles.',
  'Always carry a diverse team of Pokemon with different types.',
  'Use status moves to gain an advantage in battles.',
  "Keep your Pokemon's moves diverse to handle different situations.",
  "Use held items to enhance your Pokemon's abilities.",
];

export default function QuickTips() {
  return (
    <div className="mt-8">
      <Card className="p-6 relative overflow-hidden group">
        {/* Gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-15
          group-hover:opacity-70 transition-opacity duration-300"
        ></div>

        {/* Animated Pokeball */}
        <AnimatedPokeball
          size="large"
          className="absolute top-4 right-4 opacity-10"
          animationType="combined"
        />

        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            Quick Tips
          </h2>
          <ul className="space-y-4">
            {quickTips.map((tip, index) => (
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
  );
}
