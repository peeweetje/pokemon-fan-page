import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { EvolutionGroupsClient } from '@/app/evolution-groups/evolution-groups-client';
import { mockEvolutionGroups } from './setup';

describe('EvolutionGroupsClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders search input', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    expect(screen.getByTestId('pokemon-search-input')).toBeInTheDocument();
  });

  test('renders evolution groups grid', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    expect(screen.getByText('bulbasaur Evolution')).toBeInTheDocument();
    expect(screen.getByText('charmander Evolution')).toBeInTheDocument();
    expect(screen.getByText('squirtle Evolution')).toBeInTheDocument();
  });

  test('renders pagination', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    expect(screen.getByTestId('pokemon-pagination')).toBeInTheDocument();
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
  });

  test('filters evolution groups based on search query', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'char' } });

    expect(screen.getByText('charmander Evolution')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur Evolution')).not.toBeInTheDocument();
    expect(screen.queryByText('squirtle Evolution')).not.toBeInTheDocument();
  });

  test('search is case insensitive', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'BULBASAUR' } });

    expect(screen.getByText('bulbasaur Evolution')).toBeInTheDocument();
  });

  test('shows empty state when no groups match search', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Should not show any evolution groups
    expect(screen.queryByText('bulbasaur Evolution')).not.toBeInTheDocument();
    expect(screen.queryByText('charmander Evolution')).not.toBeInTheDocument();
    expect(screen.queryByText('squirtle Evolution')).not.toBeInTheDocument();
  });

  test('pagination works correctly with large dataset', () => {
    // Create a larger dataset
    const largeGroups = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      pokemon: [
        {
          id: i * 3 + 1,
          name: `pokemon-${i * 3 + 1}`,
          sprite: `https://example.com/pokemon-${i * 3 + 1}.png`,
          types: ['normal'],
        },
        {
          id: i * 3 + 2,
          name: `pokemon-${i * 3 + 2}`,
          sprite: `https://example.com/pokemon-${i * 3 + 2}.png`,
          types: ['normal'],
        },
        {
          id: i * 3 + 3,
          name: `pokemon-${i * 3 + 3}`,
          sprite: `https://example.com/pokemon-${i * 3 + 3}.png`,
          types: ['normal'],
        },
      ],
    }));

    render(<EvolutionGroupsClient evolutionGroups={largeGroups} />);

    expect(screen.getByText('1 of 2')).toBeInTheDocument();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('2 of 2')).toBeInTheDocument();
  });


  test('filters by Pokemon name in evolution chain', () => {
    render(<EvolutionGroupsClient evolutionGroups={mockEvolutionGroups} />);

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'ivysaur' } });

    // Should find the bulbasaur evolution group since ivysaur is in it
    expect(screen.getByText('bulbasaur Evolution')).toBeInTheDocument();
    expect(screen.queryByText('charmander Evolution')).not.toBeInTheDocument();
    expect(screen.queryByText('squirtle Evolution')).not.toBeInTheDocument();
  });
});