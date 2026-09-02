import { describe, test, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMemoryGame } from '@/hooks/use-memory-game';
import { cardBacks } from '@/utils/memory-game-helper';

const hookMocks = vi.hoisted(() => ({
  reducedMotion: false,
  playSound: vi.fn(),
  generatePokemonIds: vi.fn(),
}));

vi.mock('framer-motion', () => ({
  useReducedMotion: () => hookMocks.reducedMotion,
}));

vi.mock('@/hooks/use-local-storage', async (importOriginal) => {
  const React = await import('react');
  return {
    useLocalStorage: (key: string, initialValue: unknown) => {
      const [value, setValue] = React.useState(initialValue);
      return [value, setValue];
    },
  };
});

// Use the real helper module but replace the randomized/noise functions.
vi.mock('@/utils/memory-game-helper', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../src/utils/memory-game-helper')>();
  return {
    ...actual,
    playSound: hookMocks.playSound,
    generatePokemonIds: hookMocks.generatePokemonIds,
    generateCards: (ids: number[]) =>
      ids.flatMap((pokemonId, index) => [
        { id: index * 2, pokemonId, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, pokemonId, isFlipped: false, isMatched: false },
      ]),
  };
});

class MockAudio {
  load = vi.fn();
  play = vi.fn(() => ({ catch: vi.fn() }));
  pause = vi.fn();
  currentTime = 0;
}

beforeAll(() => {
  Object.defineProperty(window, 'Audio', {
    writable: true,
    value: MockAudio,
  });
});

beforeEach(() => {
  hookMocks.reducedMotion = false;
  hookMocks.generatePokemonIds.mockReturnValue([1, 2]);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('useMemoryGame', () => {
  test('initializes the game on mount', () => {
    const { result } = renderHook(() => useMemoryGame());
    expect(result.current.cards).toHaveLength(4);
    expect(result.current.moves).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.formattedTime).toBe('00:00');
    expect(result.current.difficulty).toBe('medium');
  });

  test('starts the timer on the first card click and increments it', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    expect(result.current.isTimerRunning).toBe(true);

    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.timer).toBe(3);
    expect(result.current.formattedTime).toBe('00:03');
    expect(hookMocks.playSound).toHaveBeenCalledWith(
      'flip',
      true,
      expect.anything(),
    );
  });

  test('marks matching cards as matched and increments moves', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    act(() => result.current.handleCardClick(1));

    expect(result.current.moves).toBe(1);
    const matched = result.current.cards.filter(
      (card) => card.id === 0 || card.id === 1,
    );
    expect(matched.every((card) => card.isMatched)).toBe(true);
    expect(result.current.flippedCards).toEqual([]);
    expect(hookMocks.playSound).toHaveBeenCalledWith('match', true, expect.anything());
  });

  test('ends the game when all cards are matched and records a high score', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));

    act(() => result.current.handleCardClick(1));
    act(() => result.current.handleCardClick(2));
    act(() => result.current.handleCardClick(3));

    expect(result.current.gameOver).toBe(true);
    expect(result.current.showConfetti).toBe(true);
    expect(result.current.moves).toBe(2);
    expect(result.current.highScores).toHaveLength(1);
    expect(result.current.highScores[0].moves).toBe(2);
    expect(hookMocks.playSound).toHaveBeenCalledWith('success', true, expect.anything());

    // Confetti is cleared after 5 seconds.
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.showConfetti).toBe(false);
  });


  test('flips non-matching cards back after a delay', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    act(() => result.current.handleCardClick(2));

    const flipped = result.current.cards.filter(
      (card) => card.id === 0 || card.id === 2,
    );
    expect(flipped.every((card) => card.isFlipped)).toBe(true);

    act(() => vi.advanceTimersByTime(2000));
    const flippedBack = result.current.cards.filter(
      (card) => card.id === 0 || card.id === 2,
    );
    expect(flippedBack.every((card) => !card.isFlipped)).toBe(true);
    expect(result.current.flippedCards).toEqual([]);
  });

  test('ignores clicks while two cards are already flipped', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    act(() => result.current.handleCardClick(2));

    const movesBefore = result.current.moves;
    act(() => result.current.handleCardClick(3));
    expect(result.current.moves).toBe(movesBefore);
  });

  test('ignores clicks on an already matched card', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    act(() => result.current.handleCardClick(1));

    const movesBefore = result.current.moves;
    act(() => result.current.handleCardClick(0));
    expect(result.current.moves).toBe(movesBefore);
  });

  test('ignores clicks on an already flipped card', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(2));

    const movesBefore = result.current.moves;
    act(() => result.current.handleCardClick(2));
    expect(result.current.moves).toBe(movesBefore);
  });

  test('resetGame reinitializes the game and advances the card back', () => {
    const { result } = renderHook(() => useMemoryGame());
    act(() => result.current.handleCardClick(0));
    act(() => result.current.handleCardClick(1));
    expect(result.current.moves).toBe(1);

    const prevBack = result.current.selectedCardBack;
    act(() => result.current.resetGame());

    expect(result.current.moves).toBe(0);
    expect(result.current.cards).toHaveLength(4);
    expect(result.current.selectedCardBack).toBe(
      (prevBack + 1) % cardBacks.medium.length,
    );
  });

  test('reinitializes the game when the difficulty changes', () => {
    const { result } = renderHook(() => useMemoryGame());
    hookMocks.generatePokemonIds.mockClear();

    act(() => result.current.setDifficulty('hard'));
    expect(hookMocks.generatePokemonIds).toHaveBeenCalledWith('hard');
  });

  test('disables animations when reduced motion is preferred', () => {
    hookMocks.reducedMotion = true;
    const { result } = renderHook(() => useMemoryGame());
    expect(result.current.prefersReducedMotion).toBe(true);
    expect(result.current.animationsEnabled).toBe(false);
    expect(result.current.shouldAnimate).toBe(false);
  });

});


