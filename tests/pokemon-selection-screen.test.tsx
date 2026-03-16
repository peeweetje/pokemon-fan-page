import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonSelectionScreen } from '@/app/battle-simulator/pokemon-selection-screen';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock Card component
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, onClick }: any) => (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  ),
}));

// Mock PokemonSearch component
vi.mock('@/components/pokemon-search', () => ({
  PokemonSearch: ({ onSearch }: any) => (
    <input 
      data-testid="pokemon-search-input"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search Pokemon..."
    />
  ),
}));

// Mock PokemonPagination component
vi.mock('@/components/pokemon-grid/pokemon-pagination', () => ({
  PokemonPagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pokemon-pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  ),
}));

describe('PokemonSelectionScreen', () => {
  const mockPokemonList = [
    {
      id: 1,
      name: 'bulbasaur',
      sprite: 'https://example.com/bulbasaur.png',
      types: ['grass', 'poison'],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        'special-attack': 65,
        'special-defense': 65,
        speed: 45,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
        { name: 'vine-whip', type: 'grass', power: 45, accuracy: 100 },
      ],
    },
    {
      id: 4,
      name: 'charmander',
      sprite: 'https://example.com/charmander.png',
      types: ['fire'],
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        'special-attack': 60,
        'special-defense': 50,
        speed: 65,
      },
      moves: [
        { name: 'scratch', type: 'normal', power: 40, accuracy: 100 },
        { name: 'ember', type: 'fire', power: 40, accuracy: 100 },
      ],
    },
    {
      id: 7,
      name: 'squirtle',
      sprite: 'https://example.com/squirtle.png',
      types: ['water'],
      stats: {
        hp: 44,
        attack: 48,
        defense: 65,
        'special-attack': 50,
        'special-defense': 64,
        speed: 43,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
        { name: 'bubble', type: 'water', power: 40, accuracy: 100 },
      ],
    },
    {
      id: 25,
      name: 'pikachu',
      sprite: 'https://example.com/pikachu.png',
      types: ['electric'],
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        'special-attack': 50,
        'special-defense': 50,
        speed: 90,
      },
      moves: [
        { name: 'thunder-shock', type: 'electric', power: 40, accuracy: 100 },
        { name: 'quick-attack', type: 'normal', power: 40, accuracy: 100 },
      ],
    },
  ];

  const mockOnPokemonSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders PokemonSearch component', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    expect(screen.getByTestId('pokemon-search-input')).toBeInTheDocument();
  });

  test('renders all Pokemon when no search query', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('squirtle')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('filters Pokemon based on search query', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'bulb' } });

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('squirtle')).not.toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('search is case insensitive', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'BULBASAUR' } });

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('filters by Pokemon ID', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: '25' } });

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  test('shows pagination when there are many Pokemon', () => {
    // Create a larger list to test pagination
    const largePokemonList = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      sprite: `https://example.com/pokemon-${i + 1}.png`,
      types: ['normal'],
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        'special-attack': 50,
        'special-defense': 50,
        speed: 50,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      ],
    }));

    render(
      <PokemonSelectionScreen 
        pokemonList={largePokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    expect(screen.getByTestId('pokemon-pagination')).toBeInTheDocument();
  });

  test('pagination shows correct page info', () => {
    const largePokemonList = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      sprite: `https://example.com/pokemon-${i + 1}.png`,
      types: ['normal'],
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        'special-attack': 50,
        'special-defense': 50,
        speed: 50,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      ],
    }));

    render(
      <PokemonSelectionScreen 
        pokemonList={largePokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    expect(screen.getByText('1 of 2')).toBeInTheDocument();
  });

  test('pagination buttons work correctly', () => {
    const largePokemonList = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      sprite: `https://example.com/pokemon-${i + 1}.png`,
      types: ['normal'],
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        'special-attack': 50,
        'special-defense': 50,
        speed: 50,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      ],
    }));

    render(
      <PokemonSelectionScreen 
        pokemonList={largePokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('2 of 2')).toBeInTheDocument();
  });

  test('selecting a Pokemon calls onPokemonSelect with correct Pokemon', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const bulbasaurCard = screen.getByText('bulbasaur').closest('div');
    fireEvent.click(bulbasaurCard!);

    expect(mockOnPokemonSelect).toHaveBeenCalledWith(mockPokemonList[0]);
  });

  test('renders Pokemon types correctly', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  test('shows empty state when no Pokemon match search', () => {
    render(
      <PokemonSelectionScreen 
        pokemonList={mockPokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // Should not show any Pokemon cards
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('squirtle')).not.toBeInTheDocument();
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('search resets pagination to first page', () => {
    const largePokemonList = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      sprite: `https://example.com/pokemon-${i + 1}.png`,
      types: ['normal'],
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        'special-attack': 50,
        'special-defense': 50,
        speed: 50,
      },
      moves: [
        { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      ],
    }));

    render(
      <PokemonSelectionScreen 
        pokemonList={largePokemonList} 
        onPokemonSelect={mockOnPokemonSelect} 
      />
    );

    // Go to page 2
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('2 of 2')).toBeInTheDocument();

    // Search for something
    const searchInput = screen.getByTestId('pokemon-search-input');
    fireEvent.change(searchInput, { target: { value: 'pokemon-1' } });

    // Should go back to page 1
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
  });
});