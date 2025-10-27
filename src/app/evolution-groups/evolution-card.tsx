import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { typeColors } from '@/utils/pokemon-type-colors';
import { EvolutionGroup } from './evolution-types';

interface EvolutionCardProps {
  group: EvolutionGroup;
}

// Get background color based on Pokemon type
const getTypeColor = (types: string[]) => {
  if (!types || types.length === 0) return '#f5f5f5';

  const type = types[0];
  return `${
    typeColors[type as keyof typeof typeColors] || typeColors.default
  }15`; // 15 is hex for 10% opacity
};

export function EvolutionCard({ group }: EvolutionCardProps) {
  const gradientClass = getTypeColor(group.pokemon[0].types);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden`}
        style={{ backgroundColor: gradientClass }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {group.name} Evolution
            </h2>
            <span
              className="px-2 py-1 text-xs font-semibold text-white rounded-full capitalize"
              style={{
                backgroundColor:
                  typeColors[
                    group.pokemon[0].types[0] as keyof typeof typeColors
                  ] || typeColors.default,
              }}
            >
              {group.pokemon[0].types[0]}
            </span>
          </div>
          <div className="flex justify-between items-center">
            {group.pokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href={`/pokemon/${pokemon.id}`}>
                  <div className="relative w-24 h-24">
                    <Image
                      priority
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                  <p className="text-center text-gray-800 text-sm capitalize mt-2">
                    {pokemon.name}
                  </p>
                  <div className="flex justify-center gap-1 mt-1">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 rounded-full text-xs font-medium text-white capitalize"
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
                </Link>
                {index < group.pokemon.length - 1 && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
