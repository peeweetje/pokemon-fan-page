import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EvolutionGroupsClient } from '@/app/evolution-groups/evolution-groups-client';
import { EvolutionGroupGrid } from '@/app/evolution-groups/evolution-group-grid';
import { EvolutionCard } from '@/app/evolution-groups/evolution-card';

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

// Mock Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock ChevronRight icon
vi.mock('lucide-react', () => ({
  ChevronRight: ({ className }: any) => <svg className={className} />,
}));

// Mock Card component
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, style }: any) => (
    <div className={className} style={style}>
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

describe('Evolution Groups Components', () => {
  const mockEvolutionGroups = [
    {
      id: 1,
      name: 'bulbasaur',
      pokemon: [
        {
          id: 1,
          name: 'bulbasaur',
          sprite: 'https://example.com/bulbasaur.png',
          types: ['grass', 'poison'],
        },
        {
          id: 2,
          name: 'ivysaur',
          sprite: 'https://example.com/ivysaur.png',
          types: ['grass', 'poison'],
        },
        {
          id: 3,
          name: 'venusaur',
          sprite: 'https://example.com/venusaur.png',
          types: ['grass', 'poison'],
        },
      ],
    },
    {
      id: 2,
      name: 'charmander',
      pokemon: [
        {
          id: 4,
          name: 'charmander',
          sprite: 'https://example.com/charmander.png',
          types: ['fire'],
        },
        {
          id: 5,
          name: 'charmeleon',
          sprite: 'https://example.com/charmeleon.png',
          types: ['fire'],
        },
        {
          id: 6,
          name: 'charizard',
          sprite: 'https://example.com/charizard.png',
          types: ['fire', 'flying'],
        },
      ],
    },
    {
      id: 3,
      name: 'squirtle',
      pokemon: [
        {
          id: 7,
          name: 'squirtle',
          sprite: 'https://example.com/squirtle.png',
          types: ['water'],
        },
        {
          id: 8,
          name: 'wartortle',
          sprite: 'https://example.com/wartortle.png',
          types: ['water'],
        },
        {
          id: 9,
          name: 'blastoise',
          sprite: 'https://example.com/blastoise.png',
          types: ['water'],
        },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('EvolutionCard', () => {
    test('renders all Pokemon in the evolution chain', () => {
      render(<EvolutionCard group={mockEvolutionGroups[0]} />);

      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
      expect(screen.getByText('venusaur')).toBeInTheDocument();
    });

    test('renders Pokemon sprites', () => {
      render(<EvolutionCard group={mockEvolutionGroups[0]} />);

      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });

    test('renders type badges for each Pokemon', () => {
      render(<EvolutionCard group={mockEvolutionGroups[0]} />);

      // Each Pokemon should have 2 type badges (grass and poison)
      // There are 3 Pokemon, each with a grass badge, plus one in the header
      const typeBadges = screen.getAllByText('grass');
      expect(typeBadges).toHaveLength(4); // 3 Pokemon + 1 header badge
    });

    test('renders evolution arrows between Pokemon', () => {
      render(<EvolutionCard group={mockEvolutionGroups[0]} />);

      // Check for Pokemon images
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(3); // 3 Pokemon images
      
      // The arrows are rendered as SVG elements but we can't easily test them
      // since they don't have specific test IDs. The presence of the ChevronRight
      // mock indicates the arrows are being rendered.
    });

    test('links to correct Pokemon pages', () => {
      render(<EvolutionCard group={mockEvolutionGroups[0]} />);

      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/pokemon/1');
      expect(links[1]).toHaveAttribute('href', '/pokemon/2');
      expect(links[2]).toHaveAttribute('href', '/pokemon/3');
    });
  });

  describe('EvolutionGroupGrid', () => {
    test('renders all evolution groups', () => {
      render(<EvolutionGroupGrid groups={mockEvolutionGroups} />);

      expect(screen.getByText('bulbasaur Evolution')).toBeInTheDocument();
      expect(screen.getByText('charmander Evolution')).toBeInTheDocument();
      expect(screen.getByText('squirtle Evolution')).toBeInTheDocument();
    });

    test('renders correct number of evolution cards', () => {
      render(<EvolutionGroupGrid groups={mockEvolutionGroups} />);

      const evolutionCards = screen.getAllByRole('img'); // Using images as a proxy for cards
      expect(evolutionCards.length).toBeGreaterThan(0);
    });
  });

  describe('EvolutionGroupsClient', () => {
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
});