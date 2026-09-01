'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { usePokemonDetails } from '@/hooks/use-pokemon-details';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { PokeballBackgroundDesign } from './pokeball-background-design';
import { PokemonId } from './pokemon-id';
import { PokemonImage } from './pokemon-image';
import { PokemonName } from './pokemon-name';
import { getTypeColor, PokemonTypes } from './pokemon-types';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const id = url.split('/').filter(Boolean).pop() || '1';
  const { pokemonData } = usePokemonDetails(id, name);

  const types = pokemonData?.types?.map((t) => t.type.name) || [];
  const typeColor = getTypeColor(types);

  const handleCardClick = () => {
    setIsClicked(true);
  };

  return (
    <Link href={`/pokemon/${id}`}>
      <motion.div
        onClick={handleCardClick}
        className="cursor-pointer"
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
        <Card className="relative h-full overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: typeColor }}
          ></div>
          <PokeballBackgroundDesign />
          <PokemonId id={id} />
          <CardContent className="p-2">
            <PokemonImage id={id} name={name} isClicked={isClicked} />
          </CardContent>
          <CardFooter className="flex flex-col items-center p-2">
            <PokemonName name={name} isClicked={isClicked} />
            <PokemonTypes types={types} />
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
