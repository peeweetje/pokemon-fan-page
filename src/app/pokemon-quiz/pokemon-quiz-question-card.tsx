'use client';

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
    <Card className="p-6 relative overflow-hidden">
      {/* Pokemon-themed background */}
      <div className="absolute inset-0 bg-linear-to-br from-red-300 to-yellow-50 opacity-50" />

      <div className="flex gap-8 relative z-10">
        <div className="flex-1">
          <QuizProgress
            currentQuestion={currentQuestionIndex}
            totalQuestions={totalQuestions}
            score={score}
          />

          {/* Question */}
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
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
      </div>
    </Card>
  );
}
