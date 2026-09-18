'use client';

import { motion } from 'framer-motion';
import CTALinkButton from '@/app/home/cta-button';

interface CTASectionProps {
  onNavigate: (href: string) => void;
}

const CTA_ACTIONS = [
  {
    href: '/pokedex',
    label: 'View Pokédex',
    className:
      'bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full',
  },
  {
    href: '/game',
    label: 'Play Memory',
    className:
      'bg-yellow-500 text-black hover:bg-yellow-400 font-bold text-lg px-8 py-6 rounded-full',
  },
] as const;

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
            {CTA_ACTIONS.map(({ href, label, className }) => (
              <motion.div
                key={href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <CTALinkButton
                  href={href}
                  label={label}
                  className={className}
                  onNavigate={onNavigate}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

