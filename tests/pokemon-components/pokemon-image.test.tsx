import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonImage from '@/app/pokemon/pokemon-image';
import { mockPokemon, mockSpecies } from './setup';

describe('PokemonImage', () => {
  const pokemon = mockPokemon;
  const mainColor = mockSpecies.color.name;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonImage with correct image source', () => {
    render(<PokemonImage pokemon={pokemon} mainColor={mainColor} />);

    expect(screen.getByRole('img')).toHaveAttribute('src');
    const imageSrc = screen.getByRole('img').getAttribute('src');
    expect(imageSrc).toContain('/_next/image?url=');
    expect(imageSrc).toContain(encodeURIComponent(pokemon.sprites.other['official-artwork'].front_default));
  });

  test('renders PokemonImage with correct alt text', () => {
    render(<PokemonImage pokemon={pokemon} mainColor={mainColor} />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', pokemon.name);
  });
});