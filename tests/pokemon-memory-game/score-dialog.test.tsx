import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { ScoreDialog } from '@/components/pokemon-memory-game/score-dialog';

const score = (overrides = {}) => ({
  moves: 5,
  time: 30,
  date: '2024-05-01',
  difficulty: 'easy',
  ...overrides,
});

describe('ScoreDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders nothing when closed', () => {
    const { container } = render(
      <ScoreDialog
        isOpen={false}
        moves={5}
        formattedTime="00:05"
        difficulty="easy"
        highScores={[]}
        showConfetti={false}
        shouldAnimate={true}
        onPlayAgain={() => {}}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders the completion summary and play again button', () => {
    const onPlayAgain = vi.fn();
    render(
      <ScoreDialog
        isOpen={true}
        moves={7}
        formattedTime="00:42"
        difficulty="hard"
        highScores={[]}
        showConfetti={false}
        shouldAnimate={false}
        onPlayAgain={onPlayAgain}
      />,
    );
    expect(
      screen.getByText('You completed the game in 7 moves!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Time: 00:42')).toBeInTheDocument();
    expect(screen.getByText('High Scores - Hard')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Play Again'));
    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });

  test('renders confetti pieces when enabled with animations', () => {
    const { container } = render(
      <ScoreDialog
        isOpen={true}
        moves={1}
        formattedTime="00:10"
        difficulty="easy"
        highScores={[]}
        showConfetti={true}
        shouldAnimate={true}
        onPlayAgain={() => {}}
      />,
    );
    expect(
      container.querySelector('.absolute.inset-0.pointer-events-none'),
    ).not.toBeNull();
  });

  test('does not render confetti when animations are disabled', () => {
    const { container } = render(
      <ScoreDialog
        isOpen={true}
        moves={1}
        formattedTime="00:10"
        difficulty="easy"
        highScores={[]}
        showConfetti={true}
        shouldAnimate={false}
        onPlayAgain={() => {}}
      />,
    );
    expect(
      container.querySelector('.absolute.inset-0.pointer-events-none'),
    ).toBeNull();
  });

  test('filters scores by difficulty, sorts by moves, and formats dates', () => {
    render(
      <ScoreDialog
        isOpen={true}
        moves={2}
        formattedTime="00:20"
        difficulty="easy"
        highScores={[
          score({ moves: 9, date: 'May 1 2024' }), // other formatting (fallback branch)
          score({ difficulty: 'hard', moves: 1 }), // filtered out
          score({ moves: 4 }),
          score({ moves: 6 }),
        ]}
        showConfetti={false}
        shouldAnimate={false}
        onPlayAgain={() => {}}
      />,
    );

    const rows = screen.getAllByText(/^(4|6|9)$/);
    // Sorted ascending by moves for the easy difficulty only.
    expect(rows.map((row) => row.textContent)).toEqual(['4', '6', '9']);
    expect(screen.getByText('May 1 2024')).toBeInTheDocument();
  });
});
