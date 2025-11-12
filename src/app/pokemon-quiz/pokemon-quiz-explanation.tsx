'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PokemonQuizExplanationProps {
  explanation: string;
  show: boolean;
  hasNext: boolean;
  onNext: () => void;
}

export function PokemonQuizExplanation({
  explanation,
  show,
  hasNext,
  onNext,
}: PokemonQuizExplanationProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200"
    >
      <p className="text-blue-800 font-medium">{explanation}</p>
      <Button
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={onNext}
      >
        {hasNext ? 'Next Question' : 'Finish Quiz'}
      </Button>
    </motion.div>
  );
}
