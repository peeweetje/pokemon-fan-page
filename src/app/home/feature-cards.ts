import { Star, Swords, BookOpen } from 'lucide-react';

export const featureCards = [
  {
    title: 'Complete Pokédex',
    description:
      'Browse through all Pokémon with detailed information about each species.',
    href: '/pokedex',
    icon: Star,
    bgColor: 'bg-red-50',
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-500',
    delay: 0.1,
  },
  {
    title: 'Memory Game',
    description: 'Test your memory with our fun Pokémon memory matching game.',
    href: '/game',
    icon: Star,
    bgColor: 'bg-blue-50',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
    delay: 0.2,
  },
  {
    title: 'Evolution Groups',
    description:
      'Explore Pokemon evolution chains and discover how your favorite Pokemon evolve.',
    href: '/evolution-groups',
    icon: Star,
    bgColor: 'bg-yellow-50',
    iconBgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    delay: 0.3,
  },
  {
    title: 'Battle Simulator',
    description:
      'Experience Pokemon battles in real-time! Choose your Pokemon and battle against wild Pokemon.',
    href: '/battle-simulator',
    icon: Swords,
    bgColor:
      'bg-gradient-to-br from-green-50 to-green-100 border border-green-200',
    iconBgColor: 'bg-gradient-to-br from-green-100 to-green-200 shadow-inner',
    iconColor: 'text-green-600',
    delay: 0.4,
  },
  {
    title: 'Pokemon Quiz',
    description:
      'Test your Pokemon knowledge with our interactive quiz! Answer questions about Pokemon types, evolutions, and more.',
    href: '/pokemon-quiz',
    icon: Star,
    bgColor:
      'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200',
    iconBgColor: 'bg-gradient-to-br from-purple-100 to-purple-200 shadow-inner',
    iconColor: 'text-purple-600',
    delay: 0.5,
  },
  {
    title: 'Pokemon Guides',
    description:
      'Master Pokemon with our comprehensive guides! Learn about EV/IV training, competitive battling, shiny hunting, and more.',
    href: '/pokemon-guides',
    icon: BookOpen,
    bgColor:
      'bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200',
    iconBgColor: 'bg-gradient-to-br from-teal-100 to-teal-200 shadow-inner',
    iconColor: 'text-teal-600',
    delay: 0.6,
  },
];
