import { vi } from 'vitest';

// Expose a mutable switch for the mobile breakpoint so tests can flip layout.
// NOTE: vi.hoisted values cannot be exported inline (`export const x = vi.hoisted(...)`)
// because Vitest hoists vi.mock above the binding. Export it after all mocks instead.
const mobileMock = vi.hoisted(() => ({ isMobile: false }));

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => mobileMock.isMobile,
}));

// --- Mock dependent UI primitives so sidebar.tsx can be tested in isolation ---

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, type, ...props }: any) => (
    <button
      type={type ?? 'button'}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, ...props }: any) => <div data-sheet-root {...props}>{children}</div>,
  SheetContent: ({ children, ...props }: any) => (
    <div data-sheet-content {...props}>{children}</div>
  ),
  SheetHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SheetTitle: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SheetDescription: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children, ...props }: any) => (
    <div data-tooltip-provider {...props}>{children}</div>
  ),
  Tooltip: ({ children, ...props }: any) => (
    <div data-tooltip-root {...props}>{children}</div>
  ),
  TooltipTrigger: ({ children, asChild, ...props }: any) =>
    asChild ? <>{children}</> : <div {...props}>{children}</div>,
  TooltipContent: ({ children, ...props }: any) => (
    <div data-tooltip-content {...props}>{children}</div>
  ),
}));

vi.mock('lucide-react', () => ({
  PanelLeftIcon: (props: any) => <svg data-testid="panel-left-icon" {...props} />,
}));

export { mobileMock };
