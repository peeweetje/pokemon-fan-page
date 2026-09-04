'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import QuizProgress from './quiz-progress';
import { PokemonQuizOptions } from './pokemon-quiz-options';
import { PokemonQuizExplanation } from './pokemon-quiz-explanation';
import { PokemonQuizImage } from './pokemon-quiz-image';

interface PokemonQuizQuestionCardProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  selectedAnswer: string | null;
  showExplanation: boolean;
  onSelectAnswer: (option: string) => void;
  onNext: () => void;
  hasNext: boolean;
}

export function PokemonQuizQuestionCard({
  currentQuestionIndex,
  totalQuestions,
  score,
  question,
  options,
  correctAnswer,
  explanation,
  category,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
  hasNext,
}: PokemonQuizQuestionCardProps) {
  return (
    <Card className="p-8 relative overflow-hidden rounded-3xl border border-rose-200/80 shadow-xl shadow-rose-100/60 backdrop-blur-sm ring-1 ring-rose-100/60">
      {/* Pokemon-themed background */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-100/60 via-white/40 to-amber-100/60" />
      {/* Subtle glossy highlight */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/50 blur-2xl" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentQuestionIndex}
          className="flex gap-8 relative z-10"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex-1">
            <QuizProgress
              currentQuestion={currentQuestionIndex}
              totalQuestions={totalQuestions}
              score={score}
            />

            {/* Question */}
            <h2 className="text-2xl font-bold leading-snug mb-6 text-gray-800">
              {question}
            </h2>

            {/* Options */}
            <PokemonQuizOptions
              options={options}
              correctAnswer={correctAnswer}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              onSelectAnswer={onSelectAnswer}
            />

            {/* Explanation */}
            <PokemonQuizExplanation
              explanation={explanation}
              show={showExplanation}
              hasNext={hasNext}
              onNext={onNext}
            />
          </div>

          {/* Pokemon Image */}
          <PokemonQuizImage category={category} />
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
