import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { CSSProperties } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders a div with the skeleton data-slot', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
  });

  test('applies the base placeholder classes', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toHaveClass('rounded-md');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('bg-accent');
  });

  test('merges a custom className onto the base classes', () => {
    const { container } = render(<Skeleton className="my-custom-skeleton" />);
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    // tailwind-merge keeps the base rounded-md unless the custom class overrides it
    expect(skeleton).toHaveClass('my-custom-skeleton');
    expect(skeleton).toHaveClass('rounded-md');
  });

  test('forwards additional DOM props', () => {
    const onClick = vi.fn();
    const { container } = render(
      <Skeleton id="avatar-skeleton" data-sidebar="menu-skeleton-text" onClick={onClick} />
    );
    const skeleton = container.querySelector('[data-slot="skeleton"]') as HTMLElement;
    expect(skeleton).toHaveAttribute('id', 'avatar-skeleton');
    expect(skeleton).toHaveAttribute('data-sidebar', 'menu-skeleton-text');
    skeleton.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders its children', () => {
    render(<Skeleton>Loading</Skeleton>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('accepts inline style props', () => {
    const { container } = render(
      <Skeleton style={{ '--skeleton-width': '70%' } as CSSProperties} />
    );
    const skeleton = container.querySelector('[data-slot="skeleton"]') as HTMLElement;
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('70%');
  });
});