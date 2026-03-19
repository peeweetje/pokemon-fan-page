import { vi } from 'vitest';

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

// Shared test data
export const mockEvolutionGroups = [
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