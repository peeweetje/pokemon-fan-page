import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SoundToggle } from '@/components/pokemon-memory-game/sound-toggle';

describe('SoundToggle', () => {
  test('renders the volume-on icon and calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    const { container } = render(
      <SoundToggle soundEnabled={true} onToggle={onToggle} />,
    );
    expect(container.querySelector('svg.lucide-volume-2')).not.toBeNull();

    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test('renders the volume-off icon when sound is disabled', () => {
    const { container } = render(
      <SoundToggle soundEnabled={false} onToggle={() => {}} />,
    );
    expect(container.querySelector('svg.lucide-volume-x')).not.toBeNull();
    expect(container.querySelector('svg.lucide-volume-2')).toBeNull();
  });
});
