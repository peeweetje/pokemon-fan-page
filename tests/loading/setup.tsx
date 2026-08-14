import { vi } from 'vitest';

// Mock framer-motion so loading components render plain elements in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, whileHover, whileTap, whileInView, variants, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
}));
