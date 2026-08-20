import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { PokemonMemoryGame } from '@/components/pokemon-memory-game/pokemon-memory-game';

const hookMocks = vi.hoisted(() => ({
  useMemoryGame: vi.fn(),
}));

vi.mock('@/hooks/use-memory-game', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/hooks/use-memory-game')>();
  return {
    ...actual,
    useMemoryGame: hookMocks.useMemoryGame,
  };
});

const baseGame = () => ({
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
});

const makeCards = () => [
  { id: 0, pokemonId: 1, isFlipped: true, isMatched: false },
  { id: 1, pokemonId: 1, isFlipped: false, isMatched: true },
  { id: 2, pokemonId: 2, isFlipped: false, isMatched: false },
];

describe('PokemonMemoryGame', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders a loading spinner while loading', () => {
    hookMocks.useMemoryGame.mockReturnValue({ ...baseGame(), isLoading: true });
    const { container } = render(<PokemonMemoryGame />);
    expect(container.querySelector('.animate-spin')).not.toBeNull();
    expect(
      screen.queryByText('Pokemon Memory Game'),
    ).not.toBeInTheDocument();
  });

  test('renders the game title and stats when loaded', () => {
    hookMocks.useMemoryGame.mockReturnValue({ ...baseGame() });
    render(<PokemonMemoryGame />);
    expect(screen.getByText('Pokemon Memory Game')).toBeInTheDocument();
    expect(screen.getByText('Moves: 0')).toBeInTheDocument();
    expect(screen.getByText('Time: 00:00')).toBeInTheDocument();
  });

  test('renders the pokemon cards in a 4-column grid for easy difficulty', () => {
    hookMocks.useMemoryGame.mockReturnValue({
      ...baseGame(),
      cards: makeCards(),
      difficulty: 'easy',
    });
    const { container } = render(<PokemonMemoryGame />);
    const grid = container.querySelector('.w-full.max-w-md');
    expect(grid?.className).toContain('sm:grid-cols-4');
    expect(grid?.className).not.toContain('md:grid-cols-6');
  });

  test('uses a 6-column grid for hard difficulty', () => {
    hookMocks.useMemoryGame.mockReturnValue({
      ...baseGame(),
      cards: makeCards(),
      difficulty: 'hard',
    });
    const { container } = render(<PokemonMemoryGame />);
    const grid = container.querySelector('.w-full.max-w-md');
    expect(grid?.className).toContain('md:grid-cols-6');
  });

  test('toggles sound when the sound button is clicked', () => {
    const setSoundEnabled = vi.fn();
    hookMocks.useMemoryGame.mockReturnValue({
      ...baseGame(),
      soundEnabled: true,
      setSoundEnabled,
    });
    const { container } = render(<PokemonMemoryGame />);
    const volumeIcon = container.querySelector('svg.lucide-volume-2');
    const button = volumeIcon?.closest('button') as HTMLElement;
    fireEvent.click(button);
    expect(setSoundEnabled).toHaveBeenCalledWith(false);
  });

  test('renders the score dialog when the game is over', () => {
    hookMocks.useMemoryGame.mockReturnValue({
      ...baseGame(),
      gameOver: true,
      moves: 5,
      formattedTime: '00:05',
      highScores: [
        { moves: 3, time: 30, date: '2024-05-01', difficulty: 'easy' },
      ],
    });
    render(<PokemonMemoryGame />);
    expect(
      screen.getByText('You completed the game in 5 moves!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  test('renders confetti when showConfetti is enabled', () => {
    hookMocks.useMemoryGame.mockReturnValue({
      ...baseGame(),
      showConfetti: true,
    });
    const { container } = render(<PokemonMemoryGame />);
    expect(
      container.querySelector('.fixed.inset-0.pointer-events-none'),
    ).not.toBeNull();
  });
});