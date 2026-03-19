import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonStats from '@/app/pokemon/pokemon-stats';
import { mockPokemon } from './setup';

describe('PokemonStats', () => {
  const pokemon = mockPokemon;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonStats with stat bars', () => {
    render(<PokemonStats pokemon={pokemon} maxStat={0} />);

    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    pokemon.stats.forEach(stat => {
      const label = {
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        'special-attack': 'Sp. Atk',
        'special-defense': 'Sp. Def',
        speed: 'Speed',
      }[stat.stat.name] || stat.stat.name;

      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getAllByText(`${stat.base_stat}`).length).toBeGreaterThan(0);
    });
  });
});