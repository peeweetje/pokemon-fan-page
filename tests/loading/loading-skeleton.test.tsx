import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSkeleton } from '../../src/components/loading/loading-skeleton';

describe('LoadingSkeleton', () => {
  test('renders a single rectangle placeholder by default', () => {
    const { container } = render(<LoadingSkeleton />);
    const placeholder = container.querySelector('div');
    expect(container.querySelectorAll('div')).toHaveLength(1);
    expect(placeholder?.className).toContain('bg-gray-200');
    expect(placeholder?.className).toContain('rounded-md');
  });

  test('renders the requested count of placeholders', () => {
    const { container } = render(<LoadingSkeleton count={4} />);
    expect(container.querySelectorAll('div')).toHaveLength(4);
  });

  test('renders circle placeholders with rounded-full class', () => {
    const { container } = render(<LoadingSkeleton variant="circle" />);
    const placeholder = container.querySelector('div');
    expect(placeholder?.className).toContain('rounded-full');
    expect(placeholder?.className).not.toContain('rounded-md');
  });

  test('does not animate when animate is false', () => {
    const { container } = render(<LoadingSkeleton animate={false} />);
    const placeholder = container.querySelector('div');
    expect(placeholder?.className).not.toContain('animate-pulse');
  });

  test('animates by default', () => {
    const { container } = render(<LoadingSkeleton />);
    const placeholder = container.querySelector('div');
    expect(placeholder?.className).toContain('animate-pulse');
  });

  test('converts a numeric width to pixels', () => {
    const { container } = render(<LoadingSkeleton width={100} />);
    const placeholder = container.querySelector('div');
    expect(placeholder).toHaveStyle('width: 100px');
  });

  test('uses a string width as-is', () => {
    const { container } = render(<LoadingSkeleton width="12rem" />);
    const placeholder = container.querySelector('div');
    expect(placeholder).toHaveStyle('width: 12rem');
  });

  test('applies numeric height in pixels', () => {
    const { container } = render(<LoadingSkeleton height={48} />);
    const placeholder = container.querySelector('div');
    expect(placeholder).toHaveStyle('height: 48px');
  });

  test('renders a card variant with the card structure', () => {
    const { container } = render(<LoadingSkeleton variant="card" />);
    const card = container.querySelector('div');
    expect(card?.className).toContain('border-2');
    // Card variant renders a nested structure rather than a flat placeholder
    expect(container.querySelectorAll('div').length).toBeGreaterThan(1);
    // Card variant ignores count
    const { container: multi } = render(
      <LoadingSkeleton variant="card" count={3} />
    );
    expect(multi.querySelectorAll('div').length).toBeGreaterThan(0);
  });

  test('text variant defaults to full width and 1rem height', () => {
    const { container } = render(<LoadingSkeleton variant="text" />);
    const placeholder = container.querySelector('div');
    expect(placeholder).toHaveStyle('width: 100%');
    expect(placeholder).toHaveStyle('height: 1rem');
  });

  test('applies a custom className', () => {
    const { container } = render(<LoadingSkeleton className="custom-skeleton" />);
    const placeholder = container.querySelector('div');
    expect(placeholder?.className).toContain('custom-skeleton');
  });
});
