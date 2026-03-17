import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonHeader from '@/app/pokemon/pokemon-header';
import PokemonImage from '@/app/pokemon/pokemon-image';
import PokemonInfo from '@/app/pokemon/pokemon-info';
import PokemonPhysicalAttributes from '@/app/pokemon/pokemon-physical-attributes';
import PokemonAbilities from '@/app/pokemon/pokemon-abilities';
import PokemonDescription from '@/app/pokemon/pokemon-description';
import PokemonMoves from '@/app/pokemon/pokemon-moves';
import PokemonStats from '@/app/pokemon/pokemon-stats';

// Mock fixtures data
import { mockPokemon, mockSpecies } from '@/app/pokemon/fixtures';

describe('Pokemon Components', () => {
  const pokemon = mockPokemon;
  const species = mockSpecies;
  const types = pokemon.types.map(type => type.type.name);
  const mainColor = mockSpecies.color.name;
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const category = mockSpecies.genera.find(gen => gen.language.name === 'en')?.genus;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PokemonHeader', () => {
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

  describe('PokemonImage', () => {
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

  describe('PokemonInfo', () => {
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

  describe('PokemonPhysicalAttributes', () => {
test('renders height and weight information', () => {
      render(<PokemonPhysicalAttributes pokemon={pokemon} />);

      expect(screen.getByText('Height')).toBeInTheDocument();
      expect(screen.getByText('Weight')).toBeInTheDocument();
      expect(screen.getByText(`${(pokemon.height / 10).toFixed(1)} m`)).toBeInTheDocument();
      expect(screen.getByText(`${(pokemon.weight / 10).toFixed(1)} kg`)).toBeInTheDocument();
    });
  });

  describe('PokemonAbilities', () => {
test('renders abilities section', () => {
      render(<PokemonAbilities pokemon={pokemon} />);

      expect(screen.getByText('Abilities')).toBeInTheDocument();
      pokemon.abilities.forEach(ability => {
        expect(screen.getByText(ability.ability.name.replace('-', ' '))).toBeInTheDocument();
      });
    });
  });

describe('PokemonDescription', () => {
test('renders PokemonDescription with flavor text', () => {
      render(<PokemonDescription flavorText={species.flavor_text_entries[0].flavor_text} />);

      expect(screen.getByText(species.flavor_text_entries[0].flavor_text)).toBeInTheDocument();
    });
  });

describe('PokemonMoves', () => {
test('renders PokemonMoves with move list', () => {
      render(<PokemonMoves moves={pokemon.moves} />);

      expect(screen.getByText('Moves')).toBeInTheDocument();
      pokemon.moves.slice(0, 20).forEach(move => {
        expect(screen.getByText(move.move.name.replace('-', ' '))).toBeInTheDocument();
      });
    });
  });

  describe('PokemonStats', () => {
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
});