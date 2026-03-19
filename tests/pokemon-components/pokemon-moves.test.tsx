import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonMoves from '@/app/pokemon/pokemon-moves';
import { mockPokemon } from './setup';

describe('PokemonMoves', () => {
  const pokemon = mockPokemon;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonMoves with move list', () => {
    render(<PokemonMoves moves={pokemon.moves} />);

    expect(screen.getByText('Moves')).toBeInTheDocument();
    pokemon.moves.slice(0, 20).forEach(move => {
      expect(screen.getByText(move.move.name.replace('-', ' '))).toBeInTheDocument();
    });
  });
});