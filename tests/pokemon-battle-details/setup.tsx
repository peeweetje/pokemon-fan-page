import { vi } from 'vitest';

// Mock Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock Progress component
vi.mock('@/components/ui/progress', () => ({
  Progress: ({ value }: any) => (
    <div data-testid="progress-bar" style={{ width: `${value}%` }}>
      {value}%
    </div>
  ),
}));

// Shared test data
export const mockPokemon = {
  name: 'bulbasaur',
  sprite: 'https://example.com/bulbasaur.png',
};