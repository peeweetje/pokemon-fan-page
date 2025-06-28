'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  ChevronLeft,
  BookOpen,
  Trophy,
  Sparkles,
  Zap,
  Target,
  Menu,
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

export default function PokemonGuides() {
  const [activeSection, setActiveSection] = useState('tips');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsNavigating] = useState(false);
  const router = useRouter();

  const sections = [
    {
      id: 'tips',
      title: 'Tips & Tricks',
      icon: <BookOpen className='w-6 h-6' />,
      content: [
        {
          title: 'Type Effectiveness',
          content:
            'Understanding type matchups is crucial. Remember: Super effective moves deal 2x damage, while not very effective moves deal 0.5x damage. Some types are completely immune to others! For example, Ground moves have no effect on Flying Pokemon, and Electric moves are super effective against Water types.',
        },
        {
          title: 'Status Effects',
          content:
            'Status effects can turn the tide of battle. Burn reduces Attack by 50%, Paralysis reduces Speed by 50%, and Poison deals damage over time. Freeze completely immobilizes a Pokemon, while Sleep prevents any action. Use them strategically to gain an advantage!',
        },
        {
          title: 'Held Items',
          content:
            "Held items can provide significant advantages. Berries can heal or reduce damage, while items like Leftovers provide gradual healing. Choice items boost a stat but limit moves, and Life Orb increases damage at the cost of HP. Choose items that complement your Pokemon's role.",
        },
        {
          title: 'Weather Effects',
          content:
            "Weather conditions can dramatically affect battles. Sun boosts Fire moves and weakens Water moves, while Rain does the opposite. Sandstorm boosts Rock-type Pokemon's Special Defense, and Hail damages non-Ice types. Use weather to your advantage!",
        },
        {
          title: 'Priority Moves',
          content:
            'Priority moves always go first, regardless of Speed. Moves like Quick Attack, Extreme Speed, and Protect have different priority levels. Understanding priority is crucial for competitive battling and can help you outmaneuver faster opponents.',
        },
      ],
    },
    {
      id: 'walkthroughs',
      title: 'Walkthroughs',
      icon: <Target className='w-6 h-6' />,
      content: [
        {
          title: 'Gym Leaders',
          content:
            'Each gym leader specializes in a specific type. Build a diverse team to counter their Pokemon. Remember to level up your team and stock up on healing items before challenging them. Each gym badge increases the level of Pokemon that will obey you.',
        },
        {
          title: 'Elite Four',
          content:
            'The Elite Four is the ultimate challenge. Each member has a powerful team with diverse movesets. Make sure your team is well-balanced and at a high level (recommended level 60+). Stock up on Full Restores and Revives before challenging them.',
        },
        {
          title: 'Champion Battle',
          content:
            'The Champion battle is the final test. Their team is diverse and powerful. Use your knowledge of type matchups and strategy to overcome this challenge. The Champion often uses a mix of different types, so be prepared for anything.',
        },
        {
          title: 'Post-Game Content',
          content:
            'After becoming Champion, new challenges await! Battle facilities like the Battle Tower offer tougher opponents and better rewards. Legendary Pokemon become available, and you can complete your Pokedex. Some games even feature additional story content.',
        },
        {
          title: 'Special Events',
          content:
            'Keep an eye out for special events and limited-time challenges. These often feature rare Pokemon, exclusive items, or unique battle formats. Participate in online competitions to test your skills against trainers worldwide.',
        },
      ],
    },
    {
      id: 'training',
      title: 'EV/IV Training',
      icon: <Zap className='w-6 h-6' />,
      content: [
        {
          title: 'EV Training Basics',
          content:
            "Effort Values (EVs) are points that increase your Pokemon's stats. Each Pokemon can have a maximum of 510 EVs, with a maximum of 252 in any single stat. Defeat specific Pokemon to gain EVs in desired stats. Use Power items to speed up EV training.",
        },
        {
          title: 'IV Breeding',
          content:
            "Individual Values (IVs) are genetic traits that determine a Pokemon's potential. Use the Destiny Knot to pass down 5 IVs from parents. Breed with Ditto to increase chances of perfect IVs. The Everstone can pass down natures, and Power items can pass down specific IVs.",
        },
        {
          title: 'Nature Selection',
          content:
            "Natures increase one stat by 10% and decrease another by 10%. Choose natures that complement your Pokemon's role. For example, Adamant (+Attack, -Sp. Attack) is great for physical attackers, while Modest (+Sp. Attack, -Attack) is perfect for special attackers.",
        },
        {
          title: 'Hidden Abilities',
          content:
            'Hidden Abilities are rare abilities that can only be obtained through special methods. They can be passed down through breeding, but only if the parent has the hidden ability. Some hidden abilities can completely change how a Pokemon is used in battle.',
        },
        {
          title: 'Move Training',
          content:
            'Teach your Pokemon the right moves for their role. Consider coverage moves to handle different types, status moves for support, and powerful STAB (Same Type Attack Bonus) moves. Remember that some moves can only be learned through breeding or special events.',
        },
      ],
    },
    {
      id: 'competitive',
      title: 'Competitive Battling',
      icon: <Trophy className='w-6 h-6' />,
      content: [
        {
          title: 'Team Building',
          content:
            'A good team needs: 1) A lead Pokemon, 2) A physical attacker, 3) A special attacker, 4) A tank/wall, 5) A support Pokemon, and 6) A sweeper. Ensure type coverage and synergy between team members. Consider common threats and how your team handles them.',
        },
        {
          title: 'Common Strategies',
          content:
            'Popular strategies include: 1) Setting up entry hazards (Stealth Rock, Spikes), 2) Using status moves (Thunder Wave, Will-O-Wisp), 3) Setting up stat boosts (Swords Dance, Nasty Plot), and 4) Using priority moves. Weather teams and Trick Room teams are also effective.',
        },
        {
          title: 'Meta Analysis',
          content:
            'Stay updated with the current meta. Popular Pokemon and strategies change with each generation. Use resources like Smogon and Pokemon Home to track usage statistics and team compositions. Understanding the meta helps you predict and counter common strategies.',
        },
        {
          title: 'Team Synergy',
          content:
            'Build your team with synergy in mind. Consider how Pokemon support each other. For example, a Pokemon weak to Ground types might pair well with a Flying type. Use abilities like Intimidate and moves like Follow Me to protect your sweepers.',
        },
        {
          title: 'Advanced Techniques',
          content:
            'Master advanced techniques like pivoting, prediction, and momentum control. Learn when to switch Pokemon, how to maintain offensive pressure, and when to play defensively. Understanding these concepts is crucial for high-level competitive play.',
        },
      ],
    },
    {
      id: 'shiny',
      title: 'Shiny Hunting',
      icon: <Sparkles className='w-6 h-6' />,
      content: [
        {
          title: 'Basic Methods',
          content:
            'The base chance of encountering a shiny Pokemon is 1/4096. Methods to increase odds include: 1) Masuda Method (breeding with foreign Pokemon), 2) Shiny Charm, and 3) Chain fishing. Each method has its own requirements and optimal strategies.',
        },
        {
          title: 'Advanced Techniques',
          content:
            'Advanced methods include: 1) SOS chaining (increasing odds with each call for help), 2) Dynamax Adventures (1/100 chance with Shiny Charm), and 3) Community Day events in Pokemon GO. Some methods are game-specific, so research which ones work in your version.',
        },
        {
          title: 'Tips for Success',
          content:
            '1) Use Pokemon with abilities that prevent fleeing, 2) Stock up on healing items, 3) Use a Pokemon with False Swipe to make catching easier, 4) Consider using a Pokemon with Synchronize to get the desired nature. Patience is key in shiny hunting!',
        },
        {
          title: 'Shiny Hunting Tools',
          content:
            'Essential tools include: 1) Adrenaline Orbs for SOS chaining, 2) Repels to avoid unwanted encounters, 3) Pokemon with the ability Illuminate to increase encounter rates, and 4) A Pokemon with the move Thief to check for held items.',
        },
        {
          title: 'Shiny Hunting Locations',
          content:
            'Some locations have higher shiny rates or better conditions for specific methods. Research the best spots for your chosen method. Consider factors like encounter rates, Pokemon levels, and available Pokemon when choosing a hunting location.',
        },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed inset-0 z-50 bg-black/40 flex'
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
              <div className='absolute inset-0 opacity-10 overflow-hidden pointer-events-none'>
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
              <div className='flex items-center justify-between mb-6 relative z-10'>
                <span className='font-bold text-lg'>Menu</span>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label='Close menu'
                >
                  <ChevronLeft className='w-5 h-5' />
                </Button>
              </div>
              <div className='flex flex-col gap-2 relative z-10'>
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
                    <span className='font-medium'>{section.title}</span>
                  </Button>
                ))}
              </div>
              <div className='mt-auto pt-8 relative z-10'>
                <Link href='/'>
                  <Button
                    variant='outline'
                    className='w-full gap-1'
                    onClick={() => {
                      setIsNavigating(true);
                    }}
                  >
                    <ChevronLeft className='h-4 w-4' />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Sidebar */}
      <SidebarProvider>
        <Sidebar className='border-r hidden md:flex'>
          <SidebarHeader className='p-0'>
            <div className='p-4 border-b border-gray-200/50'>
              <Link href='/'>
                <Button
                  variant='outline'
                  size='lg'
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
                >
                  <ChevronLeft className='h-4 w-4' />
                  Back to Home
                </Button>
              </Link>
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
            <div className='absolute inset-0 opacity-10 overflow-hidden'>
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

            <ScrollArea className='h-[calc(100vh-80px)]'>
              <SidebarMenu className='p-4 space-y-2'>
                {sections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full'
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
                        <span className='font-medium'>{section.title}</span>
                      </Button>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>

            {/* Decorative Pokeball */}
            <div className='absolute bottom-4 right-4 w-12 h-12 opacity-20'>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
                className='w-full h-full'
              >
                <div className='w-full h-full rounded-full border-[3px] border-black relative'>
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-black'></div>
                </div>
              </motion.div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className='bg-white'>
          <div className='p-6'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-6'
              >
                {/* Responsive header: menu button next to title on mobile */}
                <div className='flex items-center mb-8'>
                  <div className='md:hidden mr-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() => setIsMobileMenuOpen(true)}
                      className='rounded-full shadow bg-white/90'
                      aria-label='Open menu'
                    >
                      <Menu className='w-7 h-7' />
                    </Button>
                  </div>
                  <h1 className='text-3xl font-bold text-gray-800'>
                    {sections.find((s) => s.id === activeSection)?.title}
                  </h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                        <Card className='p-6 relative overflow-hidden h-full group'>
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
                            className='absolute top-4 right-4 w-16 h-16 opacity-10'
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
                            <div className='w-full h-full rounded-full border-[4px] border-black relative'>
                              <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                              <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
                            </div>
                          </motion.div>

                          {/* Floating particles */}
                          <div className='absolute inset-0 overflow-hidden'>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className='absolute w-2 h-2 rounded-full bg-white opacity-15'
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

                          <div className='relative z-10'>
                            <motion.h3
                              className='text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300'
                              whileHover={{ scale: 1.02 }}
                            >
                              {item.title}
                            </motion.h3>
                            <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
                              {item.content}
                            </p>
                          </div>

                          {/* Hover effect overlay */}
                          <div
                            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'
                          />
                        </Card>
                      </motion.div>
                    ))}
                </div>

                {/* Quick Tips Sidebar */}
                <div className='mt-8'>
                  <Card className='p-6 relative overflow-hidden group'>
                    {/* Gradient background */}
                    <div
                      className='absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-15 
                      group-hover:opacity-70 transition-opacity duration-300'
                    ></div>

                    {/* Animated Pokeball */}
                    <motion.div
                      className='absolute top-4 right-4 w-20 h-20 opacity-10'
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
                      <div className='w-full h-full rounded-full border-[4px] border-black relative'>
                        <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-black'></div>
                      </div>
                    </motion.div>

                    <div className='relative z-10'>
                      <h2 className='text-xl font-bold mb-4 text-gray-800 group-hover:text-green-600 transition-colors duration-300'>
                        Quick Tips
                      </h2>
                      <ul className='space-y-4'>
                        {[
                          'Save your game frequently, especially before important battles.',
                          'Always carry a diverse team of Pokemon with different types.',
                          'Use status moves to gain an advantage in battles.',
                          "Keep your Pokemon's moves diverse to handle different situations.",
                          "Use held items to enhance your Pokemon's abilities.",
                        ].map((tip, index) => (
                          <motion.li
                            key={index}
                            className='flex items-start gap-2 group/item'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.span
                              className='text-blue-600 group-hover/item:text-blue-700 transition-colors duration-300'
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
                            <span className='group-hover/item:text-gray-800 transition-colors duration-300'>
                              {tip}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover effect overlay */}
                    <div
                      className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'
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
