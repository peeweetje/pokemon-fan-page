'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// Pokemon type colors
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

interface PokemonCardProps {
  name: string;
  url: string;
}

interface PokemonDetails {
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [pokemonData, setPokemonData] = useState<PokemonDetails | null>(null);
  const [, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // Extract the Pokemon ID from the URL
  const id = url.split('/').filter(Boolean).pop() || '1';

  // Primary image URL (official artwork - higher quality)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Fallback image URL (basic sprite - more reliable)
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // Fetch Pokemon details to get types and stats
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPokemonData(data);
        }
      } catch (error) {
        console.error(`Failed to fetch details for ${name}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id, name]);

  // Format Pokemon ID to #001 format
  const formatPokemonId = (id: string) => {
    const numId = Number.parseInt(id);
    return `#${numId.toString().padStart(3, '0')}`;
  };

  // Get background color based on Pokemon type
  const getTypeColor = (types: string[]) => {
    if (!types || types.length === 0) return '#f5f5f5';

    const type = types[0];
    return `${
      typeColors[type as keyof typeof typeColors] || typeColors.default
    }15`; // 15 is hex for 10% opacity
  };

  const types = pokemonData?.types?.map((t) => t.type.name) || [];
  const typeColor = getTypeColor(types);

  // Handle card click with animation
  const handleCardClick = () => {
    setIsClicked(true);
    setIsLoading(true);
  };

  return (
    <Link href={`/pokemon/${id}`}>
      <motion.div
        onClick={handleCardClick}
        className='cursor-pointer'
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isClicked ? [1, 1.1, 0.3] : 1,
          transition: {
            scale: isClicked
              ? { duration: 0.4, times: [0, 0.2, 0.5] }
              : { duration: 0.3 },
          },
        }}
        whileHover={{
          y: -10,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className='relative h-full overflow-hidden'>
          {/* Background color div - separate from the card structure */}
          <div
            className='absolute inset-0 z-0'
            style={{ backgroundColor: typeColor }}
          ></div>

          {/* Pokeball background design */}
          <div className='absolute top-0 right-0 w-16 h-16 opacity-10 z-0'>
            <div className='w-full h-full rounded-full border-[6px] border-black relative'>
              <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
              <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
            </div>
          </div>

          {/* Pokemon ID */}
          <div className='pt-2 px-2 relative z-10'>
            <span className='text-xs font-mono text-gray-500 font-bold'>
              {formatPokemonId(id)}
            </span>
          </div>

          <CardContent className='p-2'>
            <motion.div
              className='relative w-24 h-24 mx-auto'
              animate={
                isClicked
                  ? {
                      scale: [1, 1.3, 1.3],
                      y: [0, -20, -20],
                      opacity: [1, 1, 0],
                      transition: { duration: 0.4, times: [0, 0.2, 1] },
                    }
                  : {}
              }
            >
              {isImageLoading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
                </div>
              )}
              <Image
                priority
                src={imageError ? fallbackImageUrl : imageUrl}
                alt={name}
                fill
                sizes='96px'
                className='object-contain drop-shadow-md'
                onError={() => setImageError(true)}
                onLoad={() => setIsImageLoading(false)}
              />
            </motion.div>
          </CardContent>

          <CardFooter className='flex flex-col items-center p-2'>
            <motion.h3
              className='font-semibold capitalize text-neutral-800 text-center mb-1'
              animate={
                isClicked
                  ? {
                      scale: [1, 1.1, 0],
                      transition: { duration: 0.4, times: [0, 0.2, 1] },
                    }
                  : {}
              }
            >
              {name}
            </motion.h3>

            {/* Pokemon Types */}
            <div className='flex gap-1'>
              {types.slice(0, 2).map((type) => (
                <span
                  key={type}
                  className='px-2 py-0.5 text-xs font-medium text-white rounded-full capitalize'
                  style={{
                    backgroundColor:
                      typeColors[type as keyof typeof typeColors] ||
                      typeColors.default,
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}

export default PokemonCard;
