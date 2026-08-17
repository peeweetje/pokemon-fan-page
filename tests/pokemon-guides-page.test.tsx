import { describe, test, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonGuides, { getIcon } from '@/app/pokemon-guides/page';

// Mock framer-motion so AnimatePresence / motion render as plain elements
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
    h3: (props: any) => <h3 {...props} />,
    li: (props: any) => <li {...props} />,
    span: (props: any) => <span {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock SecretPokeball to avoid its timers running during the test
vi.mock('@/components/secret-pokeball', () => ({
  default: () => <div data-testid="secret-pokeball" />,
}));

describe('getIcon', () => {
  test('returns the correct icon for each known section icon name', () => {
    expect(getIcon('BookOpen')).not.toBeNull();
    expect(getIcon('Target')).not.toBeNull();
    expect(getIcon('Zap')).not.toBeNull();
    expect(getIcon('Trophy')).not.toBeNull();
    expect(getIcon('Sparkles')).not.toBeNull();
  });

  test('falls back to BookOpen for an unknown icon name', () => {
    const fallback = getIcon('Unknown');
    expect(fallback).not.toBeNull();
  });
});

describe('PokemonGuides page', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the initial Tips & Tricks section by default', () => {
    render(<PokemonGuides />);

    expect(
      screen.getByRole('heading', { name: 'Tips & Tricks' })
    ).toBeInTheDocument();
    expect(screen.getByText('Type Effectiveness')).toBeInTheDocument();
    expect(screen.getByText('Quick Tips')).toBeInTheDocument();
    expect(screen.getByTestId('secret-pokeball')).toBeInTheDocument();
  });

  test('renders all section headings in the desktop sidebar', () => {
    render(<PokemonGuides />);

    expect(
      screen.getByRole('button', { name: /Tips & Tricks/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Walkthroughs/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Training/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Competitive Battling/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Shiny Hunting/ })
    ).toBeInTheDocument();
  });

  test('switches active section when a desktop sidebar button is clicked', () => {
    render(<PokemonGuides />);

    fireEvent.click(
      screen.getByRole('button', { name: /Walkthroughs/ })
    );
    expect(
      screen.getByRole('heading', { name: 'Walkthroughs' })
    ).toBeInTheDocument();
    expect(screen.getByText('Gym Leaders')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Competitive Battling/ })
    );
    expect(
      screen.getByRole('heading', { name: 'Competitive Battling' })
    ).toBeInTheDocument();
    expect(screen.getByText('Team Building')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /Shiny Hunting/ })
    );
    expect(
      screen.getByRole('heading', { name: 'Shiny Hunting' })
    ).toBeInTheDocument();
    expect(screen.getByText('Basic Methods')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: /IV Training/ })
    );
    expect(
      screen.getByRole('heading', { name: 'EV/IV Training' })
    ).toBeInTheDocument();
  });
});
