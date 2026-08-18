import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonCard } from '@/components/pokemon-card/pokemon-card';
import { PokemonId, formatPokemonId } from '@/components/pokemon-card/pokemon-id';
import { PokemonImage } from '@/components/pokemon-card/pokemon-image';
import { PokemonName } from '@/components/pokemon-card/pokemon-name';
import { PokemonTypes, getTypeColor } from '@/components/pokemon-card/pokemon-types';
import { usePokemonDetails } from '@/hooks/use-pokemon-details';

// Mock framer-motion so animation props render as plain elements in jsdom.
// The animation props are stripped so React does not warn about non-DOM props.
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
      onAnimationComplete,
      ...props
    }: any) => <div {...props}>{children}</div>,
    h3: ({
      children,
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      ...props
    }: any) => <h3 {...props}>{children}</h3>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/image as a plain <img> so tests can reliably fire onLoad/onError.
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock LoadingSpinner so tests can easily assert when the image spinner is shown.
vi.mock('@/components/loading/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner" />,
}));

vi.mock('@/hooks/use-pokemon-details', () => ({
  __esModule: true,
  usePokemonDetails: vi.fn(() => ({
    pokemonData: {
      types: [{ type: { name: 'electric' } }],
    },
  })),
}));

const mockPokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/',
};

describe('PokemonCard', () => {
  beforeEach(() => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      pokemonData: { types: [{ type: { name: 'electric' } }] },
    } as never);
  });

  test('renders the pokemon card with correct name', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('renders the pokemon image', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders the pokemon id', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  test('renders the pokemon types', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  test('links to the correct pokemon page', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });

  test('sets the clicked state when the card is clicked', () => {
    render(<PokemonCard name={mockPokemon.name} url={mockPokemon.url} />);
    fireEvent.click(screen.getByText('pikachu'));
    // The card is still rendered after the click animation state is triggered.
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/25');
  });

  test('falls back to id 1 when the url contains no id', () => {
    render(<PokemonCard name="mystery" url="" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/1');
  });

  test('renders without type pills when the hook returns no data', () => {
    vi.mocked(usePokemonDetails).mockReturnValue({ pokemonData: null } as never);
    render(<PokemonCard name="pikachu" url={mockPokemon.url} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });

  test('renders without type pills when the pokemon has no types', () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      pokemonData: { types: [] },
    } as never);
    render(<PokemonCard name="pikachu" url={mockPokemon.url} />);
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });

  test('renders when the pokemon payload has no types field', () => {
    vi.mocked(usePokemonDetails).mockReturnValue({
      pokemonData: {} as never,
    } as never);
    render(<PokemonCard name="pikachu" url={mockPokemon.url} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
});

describe('formatPokemonId', () => {
  test('pads the id with leading zeros', () => {
    expect(formatPokemonId('1')).toBe('#001');
    expect(formatPokemonId('25')).toBe('#025');
    expect(formatPokemonId('1234')).toBe('#1234');
  });
});

describe('PokemonId', () => {
  test('renders nothing when id is null', () => {
    const { container } = render(<PokemonId id={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the formatted id', () => {
    render(<PokemonId id="25" />);
    expect(screen.getByText('#025')).toBeInTheDocument();
  });
});

describe('PokemonImage', () => {
  test('shows a loading spinner while the image is loading', () => {
    render(<PokemonImage id="25" name="pikachu" isClicked={false} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('hides the loading spinner once the image loads', () => {
    render(<PokemonImage id="25" name="pikachu" isClicked={false} />);
    fireEvent.load(screen.getByRole('img'));
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  test('shows a loading spinner for the clicked state', () => {
    render(<PokemonImage id="25" name="pikachu" isClicked={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('keeps loading while falling back on first image error', () => {
    render(<PokemonImage id="25" name="pikachu" isClicked={false} />);
    fireEvent.error(screen.getByRole('img'));
    // imageError is now true but loading continues for the fallback sprite.
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('hides the spinner after a second error on the fallback sprite', () => {
    render(<PokemonImage id="25" name="pikachu" isClicked={false} />);
    fireEvent.error(screen.getByRole('img'));
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});

describe('PokemonName', () => {
  test('renders the name in its normal state', () => {
    render(<PokemonName name="pikachu" isClicked={false} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('renders the name in the clicked state', () => {
    render(<PokemonName name="pikachu" isClicked={true} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });
});

describe('getTypeColor', () => {
  test('returns the neutral color when no types are provided', () => {
    expect(getTypeColor([])).toBe('#f5f5f5');
  });

  test('returns the neutral color when types is undefined', () => {
    expect(getTypeColor(undefined as unknown as string[])).toBe('#f5f5f5');
  });

  test('returns the type color with an opacity suffix for a known type', () => {
    expect(getTypeColor(['electric'])).toBe('#F8D0301F');
  });

  test('falls back to the default color for an unknown type', () => {
    expect(getTypeColor(['mystery'])).toBe('#68A0901F');
  });
});

describe('PokemonTypes', () => {
  test('renders known pokemon types', () => {
    render(<PokemonTypes types={['electric', 'fire']} />);
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  test('renders an unknown type with the default color', () => {
    render(<PokemonTypes types={['mystery']} />);
    expect(screen.getByText('mystery')).toBeInTheDocument();
  });

  test('renders at most two types', () => {
    render(<PokemonTypes types={['fire', 'water', 'grass']} />);
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.queryByText('grass')).not.toBeInTheDocument();
  });

  test('renders no pills when there are no types', () => {
    const { container } = render(<PokemonTypes types={[]} />);
    expect(container.querySelector('div')?.childElementCount ?? 0).toBe(0);
  });
});

