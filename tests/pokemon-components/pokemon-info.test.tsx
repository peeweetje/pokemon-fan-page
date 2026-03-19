import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonInfo from '@/app/pokemon/pokemon-info';
import { mockPokemon, mockSpecies } from './setup';

describe('PokemonInfo', () => {
  const pokemon = mockPokemon;
  const types = pokemon.types.map(type => type.type.name);
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const category = mockSpecies.genera.find(gen => gen.language.name === 'en')?.genus;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonInfo with name and ID', () => {
    render(
      <PokemonInfo
        pokemon={pokemon}
        types={types}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    expect(screen.getByText(formattedId)).toBeInTheDocument();
  });

  test('renders Pokemon types', () => {
    render(
      <PokemonInfo
        pokemon={pokemon}
        types={types}
        formattedId={formattedId}
        category={category}
      />
    );

    types.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });
});