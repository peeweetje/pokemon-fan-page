import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonCard } from '../src/components/pokemon-card/pokemon-card';

vi.mock('@/hooks/use-pokemon-details', () => ({
  __esModule: true,
  usePokemonDetails: () => ({
    pokemonData: {
      types: [{ type: { name: 'electric' } }],
    },
  }),
}));

describe('PokemonCard', () => {
  const mockPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

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
});
