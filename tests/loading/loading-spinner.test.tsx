import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { LoadingSpinner } from '../../src/components/loading/loading-spinner';

describe('LoadingSpinner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the default loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders a custom text', () => {
    render(<LoadingSpinner text="Catching Pokémon..." />);
    expect(screen.getByText('Catching Pokémon...')).toBeInTheDocument();
  });

  test('does not render text when showText is false', () => {
    render(<LoadingSpinner showText={false} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('renders a pokeball spinner by default', () => {
    render(<LoadingSpinner />);
    const textEl = screen.getByText('Loading...');
    const outerContainer = textEl.closest('div');
    const spinner = outerContainer?.firstElementChild as HTMLElement;
    expect(spinner.className).toContain('border-4');
    expect(spinner.className).toContain('border-gray-800');
  });

  test('renders the simple spinner variant', () => {
    render(<LoadingSpinner variant="simple" />);
    const textEl = screen.getByText('Loading...');
    const outerContainer = textEl.closest('div');
    const spinner = outerContainer?.firstElementChild as HTMLElement;
    expect(spinner.className).toContain('border-t-blue-500');
    expect(spinner.className).toContain('rounded-full');
  });

  test('renders three dots for the dots variant', () => {
    const { container } = render(<LoadingSpinner variant="dots" />);
    const dots = container.querySelectorAll('.rounded-full.bg-blue-500');
    expect(dots).toHaveLength(3);
  });

  test('applies the expected size class', () => {
    render(<LoadingSpinner size="lg" />);
    const textEl = screen.getByText('Loading...');
    const outerContainer = textEl.closest('div');
    const spinner = outerContainer?.firstElementChild as HTMLElement;
    expect(spinner.className).toContain('w-16');
    expect(spinner.className).toContain('h-16');
  });

  test('applies a custom className to the spinner', () => {
    render(<LoadingSpinner className="custom-spinner" />);
    const textEl = screen.getByText('Loading...');
    const outerContainer = textEl.closest('div');
    const spinner = outerContainer?.firstElementChild as HTMLElement;
    expect(spinner.className).toContain('custom-spinner');
  });
});
