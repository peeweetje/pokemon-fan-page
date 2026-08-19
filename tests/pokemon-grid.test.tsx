import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonGrid } from '../src/components/pokemon-grid/pokemon-grid';
import useSWR from 'swr';

// Mock SWR
vi.mock('swr', () => ({
  default: vi.fn((url, fetcher, options) => ({
    data: options?.fallbackData,
    error: null,
    isLoading: false,
  })),
}));

// Mock usePokemonDetails
vi.mock('@/hooks/use-pokemon-details', () => ({
  __esModule: true,
  usePokemonDetails: () => ({
    pokemonData: {
      types: [{ type: { name: 'electric' } }],
    },
  }),
}));

const originalFetch = global.fetch;

describe('PokemonGrid', () => {
  const mockPokemon = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
    { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
    { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
    { name: 'spearow', url: 'https://pokeapi.co/api/v2/pokemon/21/' },
    { name: 'ekans', url: 'https://pokeapi.co/api/v2/pokemon/23/' },
    { name: 'sandshrew', url: 'https://pokeapi.co/api/v2/pokemon/27/' },
    { name: 'nidoran-f', url: 'https://pokeapi.co/api/v2/pokemon/29/' },
    { name: 'nidoran-m', url: 'https://pokeapi.co/api/v2/pokemon/32/' },
    { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' },
    { name: 'jigglypuff', url: 'https://pokeapi.co/api/v2/pokemon/39/' },
    { name: 'zubat', url: 'https://pokeapi.co/api/v2/pokemon/41/' },
    { name: 'oddish', url: 'https://pokeapi.co/api/v2/pokemon/43/' },
    { name: 'paras', url: 'https://pokeapi.co/api/v2/pokemon/46/' },
    { name: 'venonat', url: 'https://pokeapi.co/api/v2/pokemon/48/' },
    { name: 'diglett', url: 'https://pokeapi.co/api/v2/pokemon/50/' },
    { name: 'meowth', url: 'https://pokeapi.co/api/v2/pokemon/52/' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    global.fetch = originalFetch;
  });

  test('renders the pokemon grid with initial pokemon', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokemon...');
    expect(searchInput).toBeInTheDocument();
  });

  test('filters pokemon based on search query', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokemon...');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'pika' } });
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
  });

  test('filters pokemon by number', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokemon...');
    act(() => {
      fireEvent.change(searchInput, { target: { value: '25' } });
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
  });

  test('renders pagination controls', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    // Should show pagination controls
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('handles empty search results', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokemon...');
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    // Should handle empty results gracefully
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
  });

  test('renders loading skeletons while loading without initial data', () => {
    vi.mocked(useSWR).mockReturnValueOnce({
      data: { results: [] },
      error: null,
      isLoading: true,
    } as never);

    const { container } = render(<PokemonGrid initialPokemon={mockPokemon} />);

    // 10 skeleton cards are rendered (each card has placeholder divs)
    const grid = container.querySelector('.grid.grid-cols-2');
    expect(grid).not.toBeNull();
    expect(container.querySelectorAll('.bg-gray-200').length).toBeGreaterThan(0);
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('renders an error message when the fetch fails', () => {
    vi.mocked(useSWR).mockReturnValueOnce({
      data: undefined,
      error: new Error('boom'),
      isLoading: false,
    } as never);

    render(<PokemonGrid initialPokemon={mockPokemon} />);
    expect(screen.getByText('Error loading Pokémon data')).toBeInTheDocument();
  });

  test('renders the empty message when data has no results', () => {
    vi.mocked(useSWR).mockReturnValueOnce({
      data: {} as never,
      error: null,
      isLoading: false,
    } as never);

    render(<PokemonGrid initialPokemon={mockPokemon} />);
    expect(screen.getByText(/No Pokémon found/)).toBeInTheDocument();
  });

  test('fetcher resolves with the parsed json for ok responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 100 }),
    } as never);

    render(<PokemonGrid initialPokemon={mockPokemon} />);
    const fetcher = vi.mocked(useSWR).mock.calls[0][1] as (
      url: string
    ) => Promise<unknown>;

    await expect(
      fetcher('https://pokeapi.co/api/v2/pokemon?limit=100')
    ).resolves.toEqual({ count: 100 });
  });

  test('fetcher throws when the response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false } as never);

    render(<PokemonGrid initialPokemon={mockPokemon} />);
    const fetcher = vi.mocked(useSWR).mock.calls[0][1] as (
      url: string
    ) => Promise<unknown>;

    await expect(
      fetcher('https://pokeapi.co/api/v2/pokemon?limit=100')
    ).rejects.toThrow('Failed to fetch');
  });

  test('changes to the next page with the next button', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to next page'));

    // Page 2 shows the remaining pokemon.
    expect(screen.getByText('meowth')).toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('goes back to the previous page with the previous button', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(screen.getByText('meowth')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('navigates to a specific page by clicking a page number', () => {
    render(<PokemonGrid initialPokemon={mockPokemon} />);

    fireEvent.click(screen.getByText('2'));

    expect(screen.getByText('meowth')).toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });
});
