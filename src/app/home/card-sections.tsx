'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  return (
    <section className="bg-white text-gray-800 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>

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
