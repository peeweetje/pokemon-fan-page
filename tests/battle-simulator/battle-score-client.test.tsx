import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BattleScoreClient } from '@/app/battle-simulator/score/battle-score-client';
import { useBattleScore } from '@/hooks/use-battle-score';
import type { BattleScore } from '@/hooks/use-battle-score';

// Mock framer-motion (same pattern as tests/battle-simulator/setup.tsx)
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      whileInView,
      variants,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('@/hooks/use-battle-score', () => ({
  useBattleScore: vi.fn(),
}));

const mockedUseBattleScore = useBattleScore as unknown as {
  mockReturnValue: (value: {
    scores: BattleScore[];
    clearScores: () => void;
  }) => void;
};

const baseScore: Omit<BattleScore, 'id' | 'date'> = {
  result: 'win',
  playerPokemon: { name: 'bulbasaur', sprite: 'bulbasaur.png' },
  opponentPokemon: { name: 'charmander', sprite: 'charmander.png' },
  playerHP: 45,
  opponentHP: 0,
};

function makeScore(overrides: Partial<BattleScore> = {}): BattleScore {
  return {
    ...baseScore,
    id: 1,
    date: new Date('2026-01-15T12:00:00Z').toISOString(),
    ...overrides,
  };
}

describe('BattleScoreClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseBattleScore.mockReturnValue({
      scores: [],
      clearScores: vi.fn(),
    });
  });

  describe('empty state', () => {
    test('shows a message when no battles have been played', () => {
      render(<BattleScoreClient />);

      expect(screen.getByText('No battles played yet!')).toBeInTheDocument();
      expect(screen.getByText('Battles Played')).toBeInTheDocument();
    });

    test('shows zeroed summary stats', () => {
      render(<BattleScoreClient />);

      // 3 stats are zero: battles played, wins, losses
      expect(screen.getAllByText('0')).toHaveLength(3);
      expect(screen.getByText('Wins')).toBeInTheDocument();
      expect(screen.getByText('Losses')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('does not render the clear history button', () => {
      render(<BattleScoreClient />);

      expect(
        screen.queryByRole('button', { name: /clear history/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('with saved scores', () => {
    const scores: BattleScore[] = [
      makeScore({ id: 1, result: 'win' }),
      makeScore({
        id: 2,
        result: 'loss',
        playerHP: 0,
        opponentHP: 30,
      }),
      makeScore({ id: 3, result: 'win', opponentHP: 12 }),
    ];

    beforeEach(() => {
      mockedUseBattleScore.mockReturnValue({
        scores,
        clearScores: vi.fn(),
      });
    });

    test('renders the summary statistics', () => {
      render(<BattleScoreClient />);

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Wins')).toBeInTheDocument();
      // Losses value: exactly one "2" for losses (win rate is 67%)
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('67%')).toBeInTheDocument();
    });

    test('renders a history entry for each battle', () => {
      render(<BattleScoreClient />);

      expect(screen.getAllByText('Victory')).toHaveLength(2);
      expect(screen.getByText('Defeat')).toBeInTheDocument();
    });

    test('shows both Pokemon names, HP and sprites per entry', () => {
      render(<BattleScoreClient />);

      const playerNames = screen.getAllByText('bulbasaur');
      const opponentNames = screen.getAllByText('charmander');
      expect(playerNames).toHaveLength(3);
      expect(opponentNames).toHaveLength(3);

      expect(screen.getByText('HP: 30')).toBeInTheDocument();
      expect(screen.getByText('HP: 12')).toBeInTheDocument();
      // Player HP 45 in all three battles; "HP: 0" appears for each finished battle
      expect(screen.getAllByText('HP: 45')).toHaveLength(2); // battles 1 and 3
      expect(screen.getAllByText('HP: 0')).toHaveLength(2); // battle 1 opponent + battle 2 player

      const sprites = screen.getAllByRole('img');
      expect(sprites).toHaveLength(6); // 2 per battle
      expect(sprites[0]).toHaveAttribute('src', 'bulbasaur.png');
    });

    test('shows the battle date', () => {
      render(<BattleScoreClient />);

      // Compute the expected display using the same formatter the component uses
      const expectedDate = new Date(scores[0].date).toLocaleDateString();
      // All mocks share the same date, so one element per history entry matches
      expect(screen.getAllByText(expectedDate)).toHaveLength(scores.length);
    });

    test('clearing history calls clearScores', () => {
      const clearScores = vi.fn();
      mockedUseBattleScore.mockReturnValue({ scores, clearScores });

      render(<BattleScoreClient />);

      fireEvent.click(
        screen.getByRole('button', { name: /clear history/i }),
      );

      expect(clearScores).toHaveBeenCalledTimes(1);
    });
  });
});