import { vi } from 'vitest';

// Mock framer-motion so animation props render as plain elements in jsdom.
vi.mock('framer-motion', () => ({
  useReducedMotion: () => false,
  motion: {
    div: ({
      children,
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileTap,
      whileInView,
      variants,
      ...props
    }: any) => <div {...props}>{children}</div>,
    span: ({ children, initial, animate, exit, transition, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
    h3: ({ children, initial, animate, exit, transition, ...props }: any) => (
      <h3 {...props}>{children}</h3>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/image as a plain <img>.
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the Radix Dialog so dialog content always renders in tests.
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: any) => <div data-testid="dialog">{children}</div>,
  DialogTrigger: ({ children }: any) => (
    <div data-testid="dialog-trigger">{children}</div>
  ),
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
}));

// Mock audio used by the memory-game hook.
class MockAudio {
  load = vi.fn();
  play = vi.fn(() => ({ catch: vi.fn() }));
  pause = vi.fn();
  currentTime = 0;
}

Object.defineProperty(window, 'Audio', {
  writable: true,
  value: MockAudio,
});
