import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonDescription from '@/app/pokemon/pokemon-description';
import { mockSpecies } from './setup';

describe('PokemonDescription', () => {
  const species = mockSpecies;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonDescription with flavor text', () => {
    render(<PokemonDescription flavorText={species.flavor_text_entries[0].flavor_text} />);

    expect(screen.getByText(species.flavor_text_entries[0].flavor_text)).toBeInTheDocument();
  });
});