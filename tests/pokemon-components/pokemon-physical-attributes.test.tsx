import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonPhysicalAttributes from '@/app/pokemon/pokemon-physical-attributes';
import { mockPokemon } from './setup';

describe('PokemonPhysicalAttributes', () => {
  const pokemon = mockPokemon;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders height and weight information', () => {
    render(<PokemonPhysicalAttributes pokemon={pokemon} />);

    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText(`${(pokemon.height / 10).toFixed(1)} m`)).toBeInTheDocument();
    expect(screen.getByText(`${(pokemon.weight / 10).toFixed(1)} kg`)).toBeInTheDocument();
  });
});