'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Card {
  title: string;
  description: string;
  href: string;
  linkText?: string;
  icon: LucideIcon;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  delay: number;
}

interface CardSectionsProps {
  title: string;
  cards: Card[];
}

export default function CardSections({ title, cards }: CardSectionsProps) {
  const reduceMotion = useReducedMotion();
  const words = title.split(' ');

  return (
    <section className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6">
        <motion.h2
          aria-label={title}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          data-testid="explore-section-title"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: reduceMotion ? 0 : 0.1 + i * 0.08,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="inline-block mr-3 last:mr-0"
              data-testid={`explore-title-word-${i}`}
            >
              {word === 'Pokémon' ? (
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                  }
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-[length:200%_auto] bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className={`${card.bgColor} ${card.borderColor} border p-6 rounded-xl shadow-lg cursor-pointer transition-shadow hover:shadow-xl group`}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: card.delay }}
            >
              <div
                className={`${card.iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
              >
                <card.icon className={`h-8 w-8 ${card.iconColor}`} />
              </div>
              <Link href={card.href}>
                <h3
                  className={`text-xl font-bold mb-2 ${card.iconColor} underline-offset-4 decoration-2 transition-all hover:underline group-hover:underline`}
                >
                  {card.title}
                </h3>
              </Link>
              <p className="text-gray-600">{card.description}</p>
              <Link
                href={card.href}
                className={`${card.iconColor} font-medium mt-4 inline-block transition-all group-hover:translate-x-1 hover:brightness-75`}
              >
                {card.linkText ?? 'Learn More →'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
