import { describe, test, expect, vi, afterEach } from 'vitest';
import {
  cardBacks,
  difficultySettings,
  playSound,
  formatTime,
  generatePokemonIds,
  generateCards,
} from '../src/utils/memory-game-helper';

describe('memory-game-helper', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('cardBacks', () => {
    test('exposes card back designs for each difficulty', () => {
      expect(cardBacks.easy.length).toBeGreaterThan(0);
      expect(cardBacks.medium.length).toBeGreaterThan(0);
      expect(cardBacks.hard.length).toBeGreaterThan(0);
    });
  });

  describe('difficultySettings', () => {
    test('exposes pair and grid settings per difficulty', () => {
      expect(difficultySettings.easy).toEqual({ pairs: 6, gridCols: 4 });
      expect(difficultySettings.medium).toEqual({ pairs: 8, gridCols: 4 });
      expect(difficultySettings.hard).toEqual({ pairs: 12, gridCols: 6 });
    });
  });

  describe('playSound', () => {
    test('does nothing when sound is disabled', () => {
      const play = vi.fn();
      const audio = { flip: { play }, match: { play }, success: { play } } as any;
      playSound('flip', false, audio);
      expect(play).not.toHaveBeenCalled();
    });

    test('does nothing when audio is null', () => {
      expect(() => playSound('flip', true, null)).not.toThrow();
    });

    test('plays the requested sound when enabled and audio is present', () => {
      const play = vi.fn().mockResolvedValue(undefined);
      const audio = { flip: { play }, match: { play }, success: { play } } as any;
      playSound('match', true, audio);
      expect(play).toHaveBeenCalled();
    });

    test('warns when playback is rejected', async () => {
      const warn = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      const play = vi.fn().mockRejectedValue(new Error('nope'));
      const audio = { flip: { play }, match: { play }, success: { play } } as any;
      playSound('success', true, audio);
      // Warning is emitted via the rejected promise's catch.
      await vi.waitFor(() => {
        expect(warn).toHaveBeenCalledWith(
          'Failed to play sound:',
          expect.any(Error),
        );
      });
    });
  });

  describe('formatTime', () => {
    test('formats seconds as MM:SS', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(5)).toBe('00:05');
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(600)).toBe('10:00');
    });
  });

  describe('generatePokemonIds', () => {
    test('returns the expected number of unique ids within range', () => {
      const ids = generatePokemonIds('easy');
      expect(ids).toHaveLength(difficultySettings.easy.pairs);
      expect(new Set(ids).size).toBe(ids.length);
      ids.forEach((id) => {
        expect(id).toBeGreaterThanOrEqual(1);
        expect(id).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('generateCards', () => {
    test('creates two cards per pokemon id with correct flags', () => {
      const cards = generateCards([1, 2, 3]);
      expect(cards).toHaveLength(6);
      cards.forEach((card) => {
        expect(card.isFlipped).toBe(false);
        expect(card.isMatched).toBe(false);
      });

      const counts: Record<number, number> = {};
      cards.forEach((card) => {
        counts[card.pokemonId] = (counts[card.pokemonId] || 0) + 1;
      });
      expect(counts[1]).toBe(2);
      expect(counts[2]).toBe(2);
      expect(counts[3]).toBe(2);
    });

    test('assigns unique sequential card ids', () => {
      const cards = generateCards([5]);
      const ids = cards.map((card) => card.id).sort((a, b) => a - b);
      expect(ids).toEqual([0, 1]);
    });
  });
});
