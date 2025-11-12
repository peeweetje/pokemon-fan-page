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
          'p-4 rounded-lg text-left transition-all duration-200 border-2';
        const stateClasses = !showExplanation
          ? 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
          : isSelected && isCorrect
          ? 'bg-green-100 border-green-500 shadow-lg shadow-green-200'
          : isSelected && !isCorrect
          ? 'bg-red-100 border-red-500 shadow-lg shadow-red-200'
          : 'bg-white border-gray-200';

        return (
          <motion.button
            key={option}
            whileHover={!showExplanation ? { scale: 1.02 } : undefined}
            whileTap={!showExplanation ? { scale: 0.98 } : undefined}
            className={`${baseClasses} ${stateClasses}`}
            onClick={() => !showExplanation && onSelectAnswer(option)}
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
