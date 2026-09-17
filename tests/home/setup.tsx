import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, whileHover, whileTap, whileInView, variants, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, initial, animate, exit, transition, whileHover, whileTap, whileInView, variants, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, initial, animate, exit, transition, whileHover, whileTap, whileInView, variants, ...props }: any) => <p {...props}>{children}</p>,
    h2: ({ children, initial, animate, exit, transition, whileHover, whileTap, whileInView, variants, viewport, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  useReducedMotion: () => false,
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
  Cog: ({ className }: any) => <svg className={className} />,
  Cpu: ({ className }: any) => <svg className={className} />,
  Users: ({ className }: any) => <svg className={className} />,
  GraduationCap: ({ className }: any) => <svg className={className} />,
}));

// Mock Enhanced3DPokeball component
vi.mock('@/components/pokeball-three', () => ({
  default: () => <div data-testid="3d-pokeball" />,
}));