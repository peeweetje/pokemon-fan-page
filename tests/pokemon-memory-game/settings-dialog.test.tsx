import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Radix Dialog wrapper so content always renders in jsdom.
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div data-testid="dialog">{children}</div>,
  DialogTrigger: ({ children }: any) => (
    <div data-testid="dialog-trigger">{children}</div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
}));

import { SettingsDialog } from '@/components/pokemon-memory-game/settings-dialog';

const baseProps = {
  difficulty: 'easy' as const,
  setDifficulty: vi.fn(),

  soundEnabled: true,
  setSoundEnabled: vi.fn(),
  animationsEnabled: true,
  setAnimationsEnabled: vi.fn(),
  prefersReducedMotion: false,
  onDifficultyChange: vi.fn(),
};

describe('SettingsDialog', () => {
  test('renders the settings trigger, title, and toggles', () => {
    render(<SettingsDialog {...baseProps} />);
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Sound Effects')).toBeInTheDocument();
    expect(screen.getByLabelText('Animations')).toBeInTheDocument();
  });

  test('highlights the active difficulty and calls the callbacks on change', () => {
    const setDifficulty = vi.fn();
    const onDifficultyChange = vi.fn();
    render(
      <SettingsDialog
        {...baseProps}
        difficulty="easy"
        setDifficulty={setDifficulty}
        onDifficultyChange={onDifficultyChange}
      />,
    );

    const easy = screen.getByText('Easy');
    const medium = screen.getByText('Medium');
    expect(easy.className).toContain('bg-red-600');
    expect(medium.className).toContain('bg-background');

    fireEvent.click(medium);
    expect(setDifficulty).toHaveBeenCalledWith('medium');
    expect(onDifficultyChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Hard'));
    expect(setDifficulty).toHaveBeenCalledWith('hard');
    expect(onDifficultyChange).toHaveBeenCalledTimes(2);
  });

  test('toggles sound and animations through the switches', () => {
    const setSoundEnabled = vi.fn();
    const setAnimationsEnabled = vi.fn();
    render(
      <SettingsDialog
        {...baseProps}
        setSoundEnabled={setSoundEnabled}
        setAnimationsEnabled={setAnimationsEnabled}
      />,
    );

    fireEvent.click(screen.getByLabelText('Sound Effects'));
    expect(setSoundEnabled).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByLabelText('Animations'));
    expect(setAnimationsEnabled).toHaveBeenCalledWith(false);
  });

  test('shows the reduced-motion notice and disables the animation switch', () => {
    render(<SettingsDialog {...baseProps} prefersReducedMotion={true} />);
    expect(
      screen.getByText('Animations are disabled due to system preferences'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Animations')).toBeDisabled();
  });
});
