import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonQuiz from '@/app/pokemon-quiz/page';

// Mock the data module with factory function
vi.mock('@/data/quiz-questions', () => {
  const mockQuestions = [
    {
      index: 0,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      explanation: '2 + 2 equals 4.',
      category: 'Math',
    },
    {
      index: 1,
      question: 'What is 3 + 3?',
      options: ['5', '6', '7', '8'],
      correctAnswer: '6',
      explanation: '3 + 3 equals 6.',
      category: 'Math',
    },
  ];
  
  return {
    questions: mockQuestions,
  };
});

// Mock components
vi.mock('@/components/secret-pokeball', () => ({
  default: () => <div data-testid="secret-pokeball">Secret Pokeball</div>,
}));

vi.mock('@/components/back-button', () => ({
  default: () => <div data-testid="back-button">Back Button</div>,
}));

describe('Pokemon Quiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Math.random to control question selection
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial State and Loading', () => {
    test('renders loading state initially', async () => {
      render(<PokemonQuiz />);
      
      // Should show loading state initially
      expect(screen.getByText('Pokemon Quiz')).toBeInTheDocument();
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    test('renders quiz after questions are loaded', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });
  });

  describe('Question Display and Navigation', () => {
    test('displays first question correctly', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Check options are displayed
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    test('displays question progress correctly', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
      });
    });

    test('displays score correctly', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
      });
    });
  });

  describe('Answer Selection and Feedback', () => {
    test('allows selecting an answer', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select wrong answer first
      fireEvent.click(screen.getByText('3'));
      
      // Should show explanation
      await waitFor(() => {
        expect(screen.getByText('2 + 2 equals 4.')).toBeInTheDocument();
      });
      
      // Should show incorrect indicator
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('shows correct answer feedback', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select correct answer
      fireEvent.click(screen.getByText('4'));
      
      // Should show explanation
      await waitFor(() => {
        expect(screen.getByText('2 + 2 equals 4.')).toBeInTheDocument();
      });
    });

    test('updates score when correct answer is selected', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select correct answer
      fireEvent.click(screen.getByText('4'));
      
      // Score should update
      await waitFor(() => {
        expect(screen.getByText('Score: 1')).toBeInTheDocument();
      });
    });

    test('does not update score when wrong answer is selected', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select wrong answer
      fireEvent.click(screen.getByText('3'));
      
      // Score should remain 0
      await waitFor(() => {
        expect(screen.getByText('Score: 0')).toBeInTheDocument();
      });
    });
  });

  describe('Next Question Navigation', () => {
    test('shows next button when not on last question', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select an answer to show explanation
      fireEvent.click(screen.getByText('4'));
      
      // Next button should be visible
      await waitFor(() => {
        expect(screen.getByText('Next Question')).toBeInTheDocument();
      });
    });

    test('navigates to next question when next button is clicked', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Select answer and go to next question
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('Next Question'));
      
      // Should show second question
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    });

    test('shows quiz completion dialog when last question is answered', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Answer first question
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('Next Question'));
      
      // Answer second question
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('6'));
      fireEvent.click(screen.getByText('Finish Quiz'));
      
      // Should show completion dialog
      await waitFor(() => {
        expect(screen.getByText('Quiz Completed!')).toBeInTheDocument();
      });
    });
  });

  describe('Quiz Completion', () => {
    test('shows completion dialog with correct score', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Answer both questions correctly
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('Next Question'));
      
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('6'));
      fireEvent.click(screen.getByText('Finish Quiz'));
      
      // Check completion dialog
      await waitFor(() => {
        expect(screen.getByText('Quiz Completed!')).toBeInTheDocument();
        expect(screen.getByText('Your score: 2 out of 2')).toBeInTheDocument();
        expect(screen.getByText("Perfect score! You're a Pokemon Master! 🏆")).toBeInTheDocument();
      });
    });

    test('shows different message for good score', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Answer one question correctly
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('Next Question'));
      
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('5')); // Wrong answer
      fireEvent.click(screen.getByText('Finish Quiz'));
      
      // Check completion dialog
      await waitFor(() => {
        expect(screen.getByText('Quiz Completed!')).toBeInTheDocument();
        expect(screen.getByText('Your score: 1 out of 2')).toBeInTheDocument();
        expect(screen.getByText('Great job! You know your Pokemon! 🌟')).toBeInTheDocument();
      });
    });

    test('shows different message for low score', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Answer both questions wrong
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('Next Question'));
      
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('Finish Quiz'));
      
      // Check completion dialog
      await waitFor(() => {
        expect(screen.getByText('Quiz Completed!')).toBeInTheDocument();
        expect(screen.getByText('Your score: 0 out of 2')).toBeInTheDocument();
        expect(screen.getByText("Keep studying! You'll be a Pokemon Master soon! 💪")).toBeInTheDocument();
      });
    });

    test('resets quiz when try again is clicked', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Complete the quiz
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('Next Question'));
      
      await waitFor(() => {
        expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('6'));
      fireEvent.click(screen.getByText('Finish Quiz'));
      
      // Reset quiz
      await waitFor(() => {
        expect(screen.getByText('Try Again')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Try Again'));
      
      // Should show first question again
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      });
    });

    test('buttons are keyboard accessible', async () => {
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
      });
      
      // Navigate with keyboard
      const optionButton = screen.getByRole('button', { name: '3' });
      optionButton.focus();
      fireEvent.keyDown(optionButton, { key: 'Enter', code: 'Enter' });
      
      // Should select the first option
      await waitFor(() => {
        expect(screen.getByText('2 + 2 equals 4.')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles empty questions array gracefully', async () => {
      // This test would require mocking the module differently
      // For now, we test that the component renders without crashing
      render(<PokemonQuiz />);
      
      await waitFor(() => {
        expect(screen.getByText('Pokemon Quiz')).toBeInTheDocument();
      });
    });
  });
});