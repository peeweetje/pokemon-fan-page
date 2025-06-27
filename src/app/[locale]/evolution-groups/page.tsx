'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import SecretPokeball from '@/components/secret-pokeball';

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface EvolutionGroup {
  id: number;
  pokemon: Pokemon[];
  name: string;
}

// Add type colors mapping with gradients
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  default: '#68A090',
};

// Get background color based on Pokemon type
const getTypeColor = (types: string[]) => {
  if (!types || types.length === 0) return '#f5f5f5';

  const type = types[0];
  return `${
    typeColors[type as keyof typeof typeColors] || typeColors.default
  }15`; // 15 is hex for 10% opacity
};

export default function EvolutionGroups() {
  const [evolutionGroups, setEvolutionGroups] = useState<EvolutionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchEvolutionGroups = async () => {
      try {
        // Fetch all Pokemon first
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        const data = await response.json();

        // Group Pokemon by evolution chains
        const groups: EvolutionGroup[] = [];
        let currentGroup: Pokemon[] = [];
        let groupId = 1;

        for (const pokemon of data.results) {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          const detailsResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const details = await detailsResponse.json();

          currentGroup.push({
            id: Number(id),
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: details.types.map((t: any) => t.type.name),
          });

          // Create a new group every 3 Pokemon (or at the end)
          if (currentGroup.length === 3 || id === '100') {
            groups.push({
              id: groupId++,
              pokemon: [...currentGroup],
              name: currentGroup[0].name,
            });
            currentGroup = [];
          }
        }

        setEvolutionGroups(groups);
      } catch (error) {
        console.error('Error fetching evolution groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvolutionGroups();
  }, []);

  // Filter groups based on search query
  const filteredGroups = evolutionGroups.filter((group) =>
    group.pokemon.some((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGroups = filteredGroups.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <motion.div
          className='relative w-24 h-24'
          animate={{
            rotate: 360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            },
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Outer Pokeball */}
          <div className='absolute inset-0 rounded-full border-8 border-black overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
            <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
          </div>

          {/* Center Button */}
          <motion.div
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-black z-10'
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 0 rgba(0,0,0,0.1)',
                '0 0 0 10px rgba(0,0,0,0.1)',
                '0 0 0 0 rgba(0,0,0,0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Button Shine */}
            <div className='absolute top-1 left-1 w-2 h-2 bg-gray-200 rounded-full'></div>
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className='absolute inset-0 rounded-full'
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255,0,0,0.2)',
                '0 0 20px 10px rgba(255,0,0,0.2)',
                '0 0 0 0 rgba(255,0,0,0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href='/'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Home
          </Link>
          <h1 className='text-4xl font-bold text-gray-800 text-center'>
            Evolution Groups
          </h1>
          <div className='w-[100px]'></div> {/* Spacer for alignment */}
        </div>

        {/* Search */}
        <div className='relative w-full max-w-md mx-auto mb-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              type='text'
              placeholder='Search Pokemon...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 w-full'
            />
          </div>
        </div>

        {/* Evolution Groups Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <AnimatePresence mode='wait'>
            {currentGroups.map((group) => {
              const gradientClass = getTypeColor(group.pokemon[0].types);

              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden`}
                    style={{ backgroundColor: gradientClass }}
                  >
                    <div className='p-4'>
                      <div className='flex items-center gap-2 mb-4'>
                        <h2 className='text-xl font-bold text-gray-800 capitalize'>
                          {group.name} Evolution
                        </h2>
                        <span
                          className='px-2 py-1 text-xs font-semibold text-white rounded-full capitalize'
                          style={{
                            backgroundColor:
                              typeColors[
                                group.pokemon[0]
                                  .types[0] as keyof typeof typeColors
                              ] || typeColors.default,
                          }}
                        >
                          {group.pokemon[0].types[0]}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        {group.pokemon.map((pokemon, index) => (
                          <motion.div
                            key={pokemon.id}
                            className='relative'
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Link href={`/pokemon/${pokemon.id}`}>
                              <div className='relative w-24 h-24'>
                                <Image
                                  src={pokemon.sprite}
                                  alt={pokemon.name}
                                  fill
                                  className='object-contain drop-shadow-lg'
                                />
                              </div>
                              <p className='text-center text-gray-800 text-sm capitalize mt-2'>
                                {pokemon.name}
                              </p>
                              <div className='flex justify-center gap-1 mt-1'>
                                {pokemon.types.map((type) => (
                                  <span
                                    key={type}
                                    className='px-2 py-0.5 rounded-full text-xs font-medium text-white capitalize'
                                    style={{
                                      backgroundColor:
                                        typeColors[
                                          type as keyof typeof typeColors
                                        ] || typeColors.default,
                                    }}
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </Link>
                            {index < group.pokemon.length - 1 && (
                              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2'>
                                <ChevronRight className='h-6 w-6 text-gray-400' />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className='mt-8 flex justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`${
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer hover:bg-gray-100'
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current page
                    const shouldShow =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(currentPage - page) <= 1;

                    if (!shouldShow) {
                      if (page === 2 || page === totalPages - 1) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className='cursor-pointer hover:bg-gray-100'
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={`${
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer hover:bg-gray-100'
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <SecretPokeball />
    </div>
  );
}
