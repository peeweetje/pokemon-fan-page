'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PokemonQuizOptionsProps {
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  showExplanation: boolean;
  onSelectAnswer: (option: string) => void;
}

export function PokemonQuizOptions({
  options,
  correctAnswer,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
}: PokemonQuizOptionsProps) {
  return (
    <div className="grid gap-4">
      {options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;

        const baseClasses =
          'p-5 rounded-xl text-left transition-all duration-200 border-2 cursor-pointer';
        const stateClasses = !showExplanation
          ? 'bg-white/80 border-gray-200 shadow-sm hover:border-amber-300 hover:bg-white hover:shadow-lg hover:shadow-amber-100/60'
          : isSelected && isCorrect
          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-400 shadow-lg shadow-green-200/70'
          : isSelected && !isCorrect
          ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-400 shadow-lg shadow-red-200/70'
          : 'bg-white/60 border-gray-200 opacity-70';

        return (
          <motion.button
            key={option}
            whileHover={!showExplanation ? { scale: 1.02, y: -1 } : undefined}
            whileTap={!showExplanation ? { scale: 0.98 } : undefined}
            className={`${baseClasses} ${stateClasses}`}
            onClick={() => !showExplanation && onSelectAnswer(option)}
            onKeyDown={(event) => {
              if (!showExplanation && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                onSelectAnswer(option);
              }
            }}
            disabled={showExplanation}
          >
            <span className="flex w-full justify-between">
              {option}
              <span>
                {showExplanation &&
                  isSelected &&
                  (isCorrect ? (
                    <span aria-label="Correct answer">
                      <Check className="text-green-600 w-6 h-6" />
                    </span>
                  ) : (
                    <span aria-label="Incorrect answer">
                      <X className="text-red-600 w-6 h-6" />
                    </span>
                  ))}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
