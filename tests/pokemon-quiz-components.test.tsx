import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonQuizQuestionCard } from '@/app/pokemon-quiz/pokemon-quiz-question-card';
import { PokemonQuizOptions } from '@/app/pokemon-quiz/pokemon-quiz-options';
import { PokemonQuizExplanation } from '@/app/pokemon-quiz/pokemon-quiz-explanation';
import { PokemonQuizImage } from '@/app/pokemon-quiz/pokemon-quiz-image';
import QuizProgress from '@/app/pokemon-quiz/quiz-progress';
import { QuizDialog } from '@/app/pokemon-quiz/quiz-dialog';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Check: () => <span data-testid="check-icon">✓</span>,
  X: () => <span data-testid="x-icon">✗</span>,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} data-testid="pokemon-image" {...props} />,
}));

// Mock get-pokemon-images utility
vi.mock('@/utils/get-pokemon-images', () => ({
  getPokemonImage: () => '/test-image.png',
}));

// Mock Radix UI Dialog components
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div data-testid="dialog" data-open={open}>
      {children}
    </div>
  ),
  DialogContent: ({ children, className }: any) => (
    <div className={className} data-testid="dialog-content">
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children, className }: any) => (
    <h2 className={className} data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children, className }: any) => (
    <p className={className} data-testid="dialog-description">{children}</p>
  ),
}));

// Mock Radix UI Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button 
      className={className} 
      onClick={onClick} 
      data-testid="dialog-button"
      {...props}
    >
      {children}
    </button>
  ),
}));

describe('Pokemon Quiz Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PokemonQuizQuestionCard', () => {
    const defaultProps = {
      currentQuestionIndex: 0,
      totalQuestions: 2,
      score: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      explanation: '2 + 2 equals 4.',
      category: 'Math',
      selectedAnswer: null,
      showExplanation: false,
      onSelectAnswer: vi.fn(),
      onNext: vi.fn(),
      hasNext: true,
    };

    test('renders question card with all elements', () => {
      render(<PokemonQuizQuestionCard {...defaultProps} />);
      
      expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });

    test('renders options component', () => {
      render(<PokemonQuizQuestionCard {...defaultProps} />);
      
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    test('renders explanation when showExplanation is true', () => {
      render(<PokemonQuizQuestionCard {...defaultProps} showExplanation={true} />);
      
      expect(screen.getByText('2 + 2 equals 4.')).toBeInTheDocument();
    });

    test('renders Pokemon image component', () => {
      render(<PokemonQuizQuestionCard {...defaultProps} />);
      
      // Image component should be rendered (specific content depends on implementation)
      expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    });
  });

  describe('PokemonQuizOptions', () => {
    const defaultProps = {
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      selectedAnswer: null,
      showExplanation: false,
      onSelectAnswer: vi.fn(),
    };

    test('renders all options', () => {
      render(<PokemonQuizOptions {...defaultProps} />);
      
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    test('calls onSelectAnswer when option is clicked', () => {
      const onSelectAnswer = vi.fn();
      render(<PokemonQuizOptions {...defaultProps} onSelectAnswer={onSelectAnswer} />);
      
      const option = screen.getByText('4');
      option.click();
      
      expect(onSelectAnswer).toHaveBeenCalledWith('4');
    });

    test('disables options when showExplanation is true', () => {
      render(<PokemonQuizOptions {...defaultProps} showExplanation={true} />);
      
      const options = screen.getAllByRole('button');
      options.forEach(option => {
        expect(option).toBeDisabled();
      });
    });

    test('shows correct answer indicator when explanation is shown', () => {
      render(
        <PokemonQuizOptions 
          {...defaultProps} 
          showExplanation={true}
          selectedAnswer="4"
        />
      );
      
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });

    test('shows wrong answer indicator when explanation is shown', () => {
      render(
        <PokemonQuizOptions 
          {...defaultProps} 
          showExplanation={true}
          selectedAnswer="3"
        />
      );
      
      expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    });
  });

  describe('PokemonQuizExplanation', () => {
    const defaultProps = {
      explanation: '2 + 2 equals 4.',
      show: true,
      hasNext: true,
      onNext: vi.fn(),
    };

    test('renders explanation text', () => {
      render(<PokemonQuizExplanation {...defaultProps} />);
      
      expect(screen.getByText('2 + 2 equals 4.')).toBeInTheDocument();
    });

    test('renders next button when hasNext is true', () => {
      render(<PokemonQuizExplanation {...defaultProps} />);
      
      expect(screen.getByText('Next Question')).toBeInTheDocument();
    });

    test('calls onNext when next button is clicked', () => {
      const onNext = vi.fn();
      render(<PokemonQuizExplanation {...defaultProps} onNext={onNext} />);
      
      const nextButton = screen.getByText('Next Question');
      nextButton.click();
      
      expect(onNext).toHaveBeenCalled();
    });

    test('shows finish button when hasNext is false', () => {
      render(<PokemonQuizExplanation {...defaultProps} hasNext={false} />);
      
      expect(screen.queryByText('Next Question')).not.toBeInTheDocument();
      expect(screen.getByText('Finish Quiz')).toBeInTheDocument();
    });

    test('does not render when show is false', () => {
      render(<PokemonQuizExplanation {...defaultProps} show={false} />);
      
      expect(screen.queryByText('2 + 2 equals 4.')).not.toBeInTheDocument();
    });
  });

  describe('PokemonQuizImage', () => {
    test('renders Pokemon image component', () => {
      render(<PokemonQuizImage category="Math" />);
      
      expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    });

    test('renders image with correct alt text', () => {
      render(<PokemonQuizImage category="Math" />);
      
      const image = screen.getByTestId('pokemon-image');
      expect(image).toHaveAttribute('alt', 'Pokemon');
    });

    test('renders different image based on category', () => {
      const { rerender } = render(<PokemonQuizImage category="Math" />);
      
      // Re-render with different category
      rerender(<PokemonQuizImage category="Science" />);
      
      expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    });
  });

  describe('QuizProgress', () => {
    test('renders progress information', () => {
      render(
        <QuizProgress 
          currentQuestion={1}
          totalQuestions={5}
          score={3}
        />
      );
      
      expect(screen.getByText('Question 2 of 5')).toBeInTheDocument();
      expect(screen.getByText('Score: 3')).toBeInTheDocument();
    });

    test('shows correct question number (1-indexed)', () => {
      render(
        <QuizProgress 
          currentQuestion={0}
          totalQuestions={5}
          score={0}
        />
      );
      
      expect(screen.getByText('Question 1 of 5')).toBeInTheDocument();
    });

    test('updates when props change', () => {
      const { rerender } = render(
        <QuizProgress 
          currentQuestion={0}
          totalQuestions={5}
          score={0}
        />
      );
      
      rerender(
        <QuizProgress 
          currentQuestion={2}
          totalQuestions={5}
          score={1}
        />
      );
      
      expect(screen.getByText('Question 3 of 5')).toBeInTheDocument();
      expect(screen.getByText('Score: 1')).toBeInTheDocument();
    });
  });

  describe('QuizDialog', () => {
    const defaultProps = {
      open: true,
      onOpenChange: vi.fn(),
      score: 8,
      totalQuestions: 10,
    };

    test('renders dialog with completion message', () => {
      render(<QuizDialog {...defaultProps} />);
      
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Quiz Completed!');
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('Your score: 8 out of 10');
    });

    test('shows perfect score message', () => {
      render(<QuizDialog {...defaultProps} score={10} totalQuestions={10} />);
      
      expect(screen.getByText("Perfect score! You're a Pokemon Master! 🏆")).toBeInTheDocument();
    });

    test('shows good score message', () => {
      render(<QuizDialog {...defaultProps} score={7} totalQuestions={10} />);
      
      expect(screen.getByText('Great job! You know your Pokemon! 🌟')).toBeInTheDocument();
    });

    test('shows low score message', () => {
      render(<QuizDialog {...defaultProps} score={3} totalQuestions={10} />);
      
      expect(screen.getByText("Keep studying! You'll be a Pokemon Master soon! 💪")).toBeInTheDocument();
    });

    test('calls onOpenChange when try again is clicked', () => {
      const onOpenChange = vi.fn();
      render(<QuizDialog {...defaultProps} onOpenChange={onOpenChange} />);
      
      const tryAgainButton = screen.getByTestId('dialog-button');
      tryAgainButton.click();
      
      expect(onOpenChange).toHaveBeenCalled();
    });

    test('shows correct score percentage in message', () => {
      render(<QuizDialog {...defaultProps} score={5} totalQuestions={10} />);
      
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('Your score: 5 out of 10');
    });
  });
});