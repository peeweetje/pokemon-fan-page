'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { questions } from '@/data/quiz-questions';
import Image from 'next/image';
import SecretPokeball from '@/components/secret-pokeball';
import { X, Check } from 'lucide-react';

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

  // Function to randomly select 10 questions
  const selectRandomQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
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

  // Add this function at the top level of the component
  const getPokemonImage = (category: string) => {
    switch (category) {
      case 'Basic Knowledge':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // Pikachu
      case 'Types':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'; // Charizard
      case 'Evolutions':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png'; // Dragonite
      case 'Legendary Pokemon':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'; // Mewtwo
      case 'Abilities and Moves':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png'; // Lucario
      case 'Game Mechanics':
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png'; // Snorlax
      default:
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // Default to Pikachu
    }
  };

  // Don't render anything until questions are selected
  if (selectedQuestions.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <motion.div
          className='relative w-24 h-24'
          animate={{
            rotate: 360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            },
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Outer Pokeball */}
          <div className='absolute inset-0 rounded-full border-8 border-black overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
            <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
          </div>

          {/* Center Button */}
          <motion.div
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-black z-10'
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 0 rgba(0,0,0,0.1)',
                '0 0 0 10px rgba(0,0,0,0.1)',
                '0 0 0 0 rgba(0,0,0,0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Button Shine */}
            <div className='absolute top-1 left-1 w-2 h-2 bg-gray-200 rounded-full'></div>
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className='absolute inset-0 rounded-full'
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255,0,0,0.2)',
                '0 0 20px 10px rgba(255,0,0,0.2)',
                '0 0 0 0 rgba(255,0,0,0.2)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href='/'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Home
          </Link>
          <h1 className='text-4xl font-bold text-gray-800 text-center'>
            Pokemon Quiz
          </h1>
          <div className='w-[100px]'></div>
        </div>

        {!quizCompleted ? (
          <Card className='p-6 relative overflow-hidden'>
            {/* Pokemon-themed background */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 opacity-50'></div>

            {/* Pokeball decoration */}
            <div className='absolute top-4 right-4 w-16 h-16 opacity-10'>
              <div className='w-full h-full rounded-full border-[6px] border-black relative'>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
              </div>
            </div>

            <div className='flex gap-8 relative z-10'>
              <div className='flex-1'>
                {/* Progress */}
                <div className='mb-6'>
                  <div className='flex justify-between mb-2'>
                    <span className='text-sm font-medium text-gray-600'>
                      Question {currentQuestion + 1} of{' '}
                      {selectedQuestions.length}
                    </span>
                    <span className='text-sm font-medium text-gray-600'>
                      Score: {score}
                    </span>
                  </div>
                  <Progress
                    value={(currentQuestion / selectedQuestions.length) * 100}
                    className='bg-gray-200 [&>div]:bg-green-500'
                  />
                </div>

                {/* Question */}
                <h2 className='text-xl font-semibold mb-6 text-gray-800'>
                  {selectedQuestions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className='grid gap-4'>
                  {selectedQuestions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg text-left transition-all duration-200 ${
                        selectedAnswer === option
                          ? option ===
                            selectedQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500 shadow-lg shadow-green-200'
                            : 'bg-red-100 border-red-500 shadow-lg shadow-red-200'
                          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                      } border-2`}
                      onClick={() => !showExplanation && handleAnswer(option)}
                      disabled={showExplanation}
                    >
                      <span className='flex w-full justify-between'>
                        {option}
                        <span>
                          {showExplanation &&
                            selectedAnswer === option &&
                            (option ===
                            selectedQuestions[currentQuestion].correctAnswer ? (
                              <span aria-label='Correct answer'>
                                <Check className='text-green-600 w-6 h-6' />
                              </span>
                            ) : (
                              <span aria-label='Incorrect answer'>
                                <X className='text-red-600 w-6 h-6' />
                              </span>
                            ))}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200'
                  >
                    <p className='text-blue-800 font-medium'>
                      {selectedQuestions[currentQuestion].explanation}
                    </p>
                    <Button
                      className='mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200'
                      onClick={handleNext}
                    >
                      {currentQuestion < selectedQuestions.length - 1
                        ? 'Next Question'
                        : 'Finish Quiz'}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Pokemon Image */}
              <div className='hidden lg:block w-64 h-64 relative'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className='w-full h-full'
                >
                  <Image
                    src={getPokemonImage(
                      selectedQuestions[currentQuestion].category
                    )}
                    alt='Pokemon'
                    fill
                    className='object-contain drop-shadow-2xl'
                  />
                </motion.div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className='p-6 text-center relative overflow-hidden'>
            {/* Pokemon-themed background */}
            <div className='absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50'></div>

            {/* Pokeball decoration */}
            <div className='absolute top-4 right-4 w-16 h-16 opacity-10'>
              <div className='w-full h-full rounded-full border-[6px] border-black relative'>
                <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
              </div>
            </div>

            <div className='relative z-10'>
              <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                Quiz Completed!
              </h2>
              <p className='text-xl mb-6 text-gray-700'>
                Your score: {score} out of {selectedQuestions.length}
              </p>
              <p className='text-gray-600 mb-8 font-medium'>
                {score === selectedQuestions.length
                  ? "Perfect score! You're a Pokemon Master! 🏆"
                  : score >= selectedQuestions.length * 0.7
                  ? 'Great job! You know your Pokemon! 🌟'
                  : "Keep studying! You'll be a Pokemon Master soon! 💪"}
              </p>
              <div className='flex justify-center'>
                <Button
                  onClick={resetQuiz}
                  className='w-40 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200'
                  size='sm'
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
      <SecretPokeball />
    </div>
  );
}
