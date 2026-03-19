import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import PokemonHeader from '@/app/pokemon/pokemon-header';
import { mockPokemon, mockSpecies } from './setup';

describe('PokemonHeader', () => {
  const pokemon = mockPokemon;
  const species = mockSpecies;
  const types = pokemon.types.map(type => type.type.name);
  const mainColor = mockSpecies.color.name;
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const category = mockSpecies.genera.find(gen => gen.language.name === 'en')?.genus;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonHeader with all child components', () => {
    render(
      <PokemonHeader
        pokemon={pokemon}
        species={species}
        types={types}
        mainColor={mainColor}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    expect(screen.getByText(formattedId)).toBeInTheDocument();
  });

  test('renders PokemonImage component', () => {
    render(
      <PokemonHeader
        pokemon={pokemon}
        species={species}
        types={types}
        mainColor={mainColor}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders PokemonInfo component', () => {
    render(
      <PokemonHeader
        pokemon={pokemon}
        species={species}
        types={types}
        mainColor={mainColor}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    expect(screen.getByText(formattedId)).toBeInTheDocument();
  });

  test('renders PokemonPhysicalAttributes component', () => {
    render(
      <PokemonHeader
        pokemon={pokemon}
        species={species}
        types={types}
        mainColor={mainColor}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
  });

  test('renders PokemonAbilities component', () => {
    render(
      <PokemonHeader
        pokemon={pokemon}
        species={species}
        types={types}
        mainColor={mainColor}
        formattedId={formattedId}
        category={category}
      />
    );

    expect(screen.getByText('Abilities')).toBeInTheDocument();
  });
});