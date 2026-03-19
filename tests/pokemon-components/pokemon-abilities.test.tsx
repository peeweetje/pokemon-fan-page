import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonAbilities from '@/app/pokemon/pokemon-abilities';
import { mockPokemon } from './setup';

describe('PokemonAbilities', () => {
  const pokemon = mockPokemon;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders abilities section', () => {
    render(<PokemonAbilities pokemon={pokemon} />);

    expect(screen.getByText('Abilities')).toBeInTheDocument();
    pokemon.abilities.forEach(ability => {
      expect(screen.getByText(ability.ability.name.replace('-', ' '))).toBeInTheDocument();
    });
  });
});