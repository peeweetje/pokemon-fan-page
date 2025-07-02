'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { typeColors } from '@/utils/pokemon-type-colors';
import { PokeballBackgroundDesign } from './pokeball-background-design';
import { PokemonId, formatPokemonId } from './pokemon-id';
import { PokemonTypes, getTypeColor } from './pokemon-types';

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
          <PokeballBackgroundDesign />
          <PokemonId id={id} />
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
            <PokemonTypes types={types} />
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
