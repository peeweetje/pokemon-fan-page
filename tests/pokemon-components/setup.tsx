import { vi } from 'vitest';

// Mock next/image to render a plain img tag in tests
vi.mock('next/image', () => ({
  default: ({ src, alt, priority, fill, sizes, quality, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock fixtures data
export { mockPokemon, mockSpecies } from '@/app/pokemon/fixtures';