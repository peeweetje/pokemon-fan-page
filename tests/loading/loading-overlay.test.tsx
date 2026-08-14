import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { LoadingOverlay } from '../../src/components/loading/loading-overlay';

function Content() {
  return <div>Pokémon content</div>;
}

describe('LoadingOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders children directly when not loading', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <Content />
      </LoadingOverlay>
    );
    expect(screen.getByText('Pokémon content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('renders children and the spinner overlay when loading', () => {
    render(
      <LoadingOverlay isLoading>
        <Content />
      </LoadingOverlay>
    );
    expect(screen.getByText('Pokémon content')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('dims the children with reduced opacity when loading', () => {
    const { container } = render(
      <LoadingOverlay isLoading>
        <Content />
      </LoadingOverlay>
    );
    const dimmedWrapper = container.querySelector('.opacity-50');
    expect(dimmedWrapper).not.toBeNull();
    expect(dimmedWrapper?.textContent).toContain('Pokémon content');
  });

  test('renders a custom spinner text when loading', () => {
    render(
      <LoadingOverlay isLoading text="Please wait...">
        <Content />
      </LoadingOverlay>
    );
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  test('passes a custom spinner variant to the underlying spinner', () => {
    const { container } = render(
      <LoadingOverlay isLoading spinnerVariant="dots">
        <Content />
      </LoadingOverlay>
    );
    expect(container.querySelectorAll('.rounded-full.bg-blue-500')).toHaveLength(3);
  });

  test('adds the fixed class to the overlay when fullScreen is true', () => {
    const { container } = render(
      <LoadingOverlay isLoading fullScreen>
        <Content />
      </LoadingOverlay>
    );
    const overlay = container.querySelector('.inset-0');
    expect(overlay?.className).toContain('fixed');
  });

  test('keeps the overlay absolute when fullScreen is false', () => {
    const { container } = render(
      <LoadingOverlay isLoading>
        <Content />
      </LoadingOverlay>
    );
    const overlay = container.querySelector('.absolute.inset-0');
    expect(overlay?.className).toContain('absolute');
    expect(overlay?.className).not.toContain('fixed');
  });

  test('applies a custom overlayClassName', () => {
    const { container } = render(
      <LoadingOverlay isLoading overlayClassName="custom-overlay">
        <Content />
      </LoadingOverlay>
    );
    const overlay = container.querySelector('.absolute.inset-0');
    expect(overlay?.className).toContain('custom-overlay');
  });
});
