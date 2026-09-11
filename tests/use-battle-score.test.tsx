import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBattleScore } from '../src/hooks/use-battle-score';
import type { BattleScore } from '../src/hooks/use-battle-score';

const sampleScore: Omit<BattleScore, 'id' | 'date'> = {
  result: 'win',
  playerPokemon: { name: 'bulbasaur', sprite: 'bulbasaur.png' },
  opponentPokemon: { name: 'charmander', sprite: 'charmander.png' },
  playerHP: 45,
  opponentHP: 0,
};

describe('useBattleScore', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('starts with an empty score list', () => {
    const { result } = renderHook(() => useBattleScore());

    expect(result.current.scores).toEqual([]);
  });

  test('reads previously stored scores from localStorage', () => {
    const stored: BattleScore[] = [
      {
        ...sampleScore,
        id: 123,
        date: '2026-01-01T00:00:00.000Z',
      },
    ];
    window.localStorage.setItem(
      'battle-simulator-scores',
      JSON.stringify(stored),
    );

    const { result } = renderHook(() => useBattleScore());

    expect(result.current.scores).toEqual(stored);
  });

  test('addScore prepends a new score with id and date', () => {
    const { result } = renderHook(() => useBattleScore());

    act(() => result.current.addScore(sampleScore));

    expect(result.current.scores).toHaveLength(1);
    const score = result.current.scores[0];
    expect(score.result).toBe('win');
    expect(score.playerPokemon.name).toBe('bulbasaur');
    expect(score.opponentHP).toBe(0);
    expect(typeof score.id).toBe('number');
    expect(new Date(score.date).toString()).not.toBe('Invalid Date');
  });

  test('newest scores are kept at the front of the list', () => {
    const { result } = renderHook(() => useBattleScore());

    act(() => result.current.addScore({ ...sampleScore, result: 'win' }));
    act(() =>
      result.current.addScore({ ...sampleScore, result: 'loss', playerHP: 0 }),
    );

    expect(result.current.scores).toHaveLength(2);
    expect(result.current.scores[0].result).toBe('loss');
    expect(result.current.scores[1].result).toBe('win');
  });

  test('addScore persists to localStorage', () => {
    const { result } = renderHook(() => useBattleScore());

    act(() => result.current.addScore(sampleScore));

    const raw = window.localStorage.getItem('battle-simulator-scores');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].result).toBe('win');
  });

  test('clearScores empties the list and localStorage', () => {
    const { result } = renderHook(() => useBattleScore());

    act(() => result.current.addScore(sampleScore));
    act(() => result.current.clearScores());

    expect(result.current.scores).toEqual([]);
    expect(
      JSON.parse(
        window.localStorage.getItem('battle-simulator-scores') || '[]',
      ),
    ).toEqual([]);
  });
});