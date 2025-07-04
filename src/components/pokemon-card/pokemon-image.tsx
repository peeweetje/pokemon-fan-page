'use client';

import { LoadingSpinner } from '@/components/loading/loading-spinner';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface PokemonImageProps {
  id: string;
  name: string;
  isClicked: boolean;
}

const MotionImage = motion.create(Image);

export function PokemonImage({ id, name, isClicked }: PokemonImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="relative w-24 h-24 mx-auto">
      {(isImageLoading || isClicked) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner variant="pokeball" size="md" showText={false} />
        </div>
      )}
      <MotionImage
        priority
        src={imageError ? fallbackImageUrl : imageUrl}
        alt={name}
        fill
        sizes="96px"
        className="object-contain drop-shadow-md"
        onError={() => setImageError(true)}
        onLoad={() => setIsImageLoading(false)}
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
        style={{ opacity: isImageLoading ? 0 : 1 }}
      />
    </div>
  );
}
