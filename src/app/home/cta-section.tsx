import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (href: string) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-500 to-blue-600 py-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to become a Pokémon Master?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey by exploring our comprehensive Pokédex, test your
            memory with our game, and learn about all your favorite Pokémon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/pokedex">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full"
                >
                  Go to Pokédex <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/game">
                <Button
                  size="lg"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold text-lg px-8 py-6 rounded-full"
                >
                  Play Memory Game <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
