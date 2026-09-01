'use client';

import SecretPokeball from '@/components/secret-pokeball';
import BackButton from '@/components/back-button';
import { QuizDialog } from './quiz-dialog';
import { questions } from '@/data/quiz-questions';
import { useEffect, useState } from 'react';
import { PokemonQuizLoader } from './pokemon-quiz-loader';
import { PokemonQuizQuestionCard } from './pokemon-quiz-question-card';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export default function PokemonQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // Function to randomly select 10 questions using Fisher-Yates shuffle
  const selectRandomQuestions = () => {
    const array = [...questions];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 10);
  };

  // Initialize quiz with random questions
  useEffect(() => {
    setSelectedQuestions(selectRandomQuestions());
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === selectedQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setSelectedQuestions(selectRandomQuestions());
  };

  // Don't render anything until questions are selected
  if (selectedQuestions.length === 0) {
    return <PokemonQuizLoader />;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Pokemon Quiz
          </h1>
          <div className="w-[100px]"></div>
        </div>

        {!quizCompleted ? (
          <PokemonQuizQuestionCard
            currentQuestionIndex={currentQuestion}
            totalQuestions={selectedQuestions.length}
            score={score}
            question={selectedQuestions[currentQuestion].question}
            options={selectedQuestions[currentQuestion].options}
            correctAnswer={selectedQuestions[currentQuestion].correctAnswer}
            explanation={selectedQuestions[currentQuestion].explanation}
            category={selectedQuestions[currentQuestion].category}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onSelectAnswer={handleAnswer}
            onNext={handleNext}
            hasNext={currentQuestion < selectedQuestions.length - 1}
          />
        ) : (
          <QuizDialog
            open={quizCompleted}
            onOpenChange={resetQuiz}
            score={score}
            totalQuestions={selectedQuestions.length}
          />
        )}
      </div>
      <SecretPokeball />
    </div>
  );
}
