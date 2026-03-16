import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonMemoryGame } from '../src/components/pokemon-memory-game/pokemon-memory-game';

// Mock the useMemoryGame hook with minimal implementation
vi.mock('../src/hooks/use-memory-game', () => ({
  useMemoryGame: () => ({
    // Minimal mock that just returns basic values
    cards: [],
    moves: 0,
    gameOver: false,
    isLoading: false,
    showConfetti: false,
    formattedTime: '00:00',
    difficulty: 'easy',
    setDifficulty: vi.fn(),
    soundEnabled: true,
    setSoundEnabled: vi.fn(),
    animationsEnabled: true,
    setAnimationsEnabled: vi.fn(),
    selectedCardBack: 0,
    highScores: [],
    shouldAnimate: true,
    prefersReducedMotion: false,
    handleCardClick: vi.fn(),
    resetGame: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  useReducedMotion: () => false,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock audio
Object.defineProperty(window, 'Audio', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    load: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    currentTime: 0,
  })),
});

describe('PokemonMemoryGame', () => {
  test('renders without crashing', () => {
    render(<PokemonMemoryGame />);
    
    // Just verify it renders without throwing errors
    expect(screen.getByText('Pokemon Memory Game')).toBeInTheDocument();
  });
});
