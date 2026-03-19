import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, size }: any) => (
    <button className={className} onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronRight: ({ className }: any) => <svg className={className} />,
  Star: ({ className }: any) => <svg className={className} />,
  Swords: ({ className }: any) => <svg className={className} />,
  BookOpen: ({ className }: any) => <svg className={className} />,
}));

// Mock Enhanced3DPokeball component
vi.mock('@/components/pokeball-three', () => ({
  default: () => <div data-testid="3d-pokeball" />,
}));