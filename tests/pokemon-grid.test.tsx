import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonGrid } from '../src/components/pokemon-grid/pokemon-grid';

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
});
