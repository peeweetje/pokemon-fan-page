import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { mobileMock } from './setup';
import {
  Sidebar,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import type { SidebarContextProps } from '@/components/ui/sidebar';

// Helper that lets tests read the current context value on demand.
function ContextCapture() {
  const ctx = useSidebar();
  return (
    <button
      type="button"
      data-testid="capture"
      onClick={() => {
        (window as any).__capturedCtx = ctx;
      }}
    >
      capture
    </button>
  );
}

function getCapturedCtx(): SidebarContextProps {
  return (window as any).__capturedCtx as SidebarContextProps;
}

describe('useSidebar', () => {
  beforeEach(() => {
    mobileMock.isMobile = false;
    vi.clearAllMocks();
  });

  test('throws when used outside of a SidebarProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<SidebarTrigger />)).toThrow(
      'useSidebar must be used within a SidebarProvider.'
    );
    errorSpy.mockRestore();
  });

  test('returns the context value when used within a provider', () => {
    render(
      <SidebarProvider>
        <ContextCapture />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().open).toBe(true);
    expect(getCapturedCtx().state).toBe('expanded');
    expect(typeof getCapturedCtx().setOpen).toBe('function');
    expect(typeof getCapturedCtx().toggleSidebar).toBe('function');
  });
});
describe('SidebarProvider', () => {
  beforeEach(() => {
    mobileMock.isMobile = false;
    document.cookie = '';
    vi.clearAllMocks();
  });

  test('renders the wrapper and children by default (uncontrolled, expanded)', () => {
    const { container } = render(
      <SidebarProvider>
        <div data-testid="child">hi</div>
      </SidebarProvider>
    );
    expect(container.querySelector('[data-slot="sidebar-wrapper"]')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container.querySelector('[data-tooltip-provider]')).toBeInTheDocument();
  });

  test('respects defaultOpen={false} so state starts collapsed', () => {
    render(
      <SidebarProvider defaultOpen={false}>
        <ContextCapture />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().open).toBe(false);
    expect(getCapturedCtx().state).toBe('collapsed');
  });

  test('applies custom className and style to the wrapper', () => {
    const { container } = render(
      <SidebarProvider className="custom-wrapper">
        <div />
      </SidebarProvider>
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper).toHaveClass('custom-wrapper');
    expect((wrapper as HTMLElement).style.getPropertyValue('--sidebar-width')).toBe('16rem');
  });

  test('toggling updates state and writes the state cookie', () => {
    render(
      <SidebarProvider>
        <ContextCapture />
        <SidebarTrigger />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().open).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().open).toBe(false);
    expect(document.cookie).toContain('sidebar_state=false');
  });

  test('supports a controlled open/onOpenChange pair', () => {
    const onOpenChange = vi.fn();
    render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <SidebarTrigger />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  test('keyboard shortcut (meta/ctrl + b) toggles the sidebar', () => {
    const onOpenChange = vi.fn();
    render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <ContextCapture />
      </SidebarProvider>
    );
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true }));
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  test('keyboard handler is removed on unmount', () => {
    const onOpenChange = vi.fn();
    const { unmount } = render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <ContextCapture />
      </SidebarProvider>
    );
    unmount();
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true }));
    });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  test('does not toggle on an unrelated key or empty modifier', () => {
    const onOpenChange = vi.fn();
    render(
      <SidebarProvider open={false} onOpenChange={onOpenChange}>
        <ContextCapture />
      </SidebarProvider>
    );
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', ctrlKey: true }));
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  test('toggleSidebar on mobile flips the mobile drawer state instead', () => {
    mobileMock.isMobile = true;
    render(
      <SidebarProvider>
        <ContextCapture />
        <SidebarTrigger />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().openMobile).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
    fireEvent.click(screen.getByTestId('capture'));
    expect(getCapturedCtx().openMobile).toBe(true);
    // desktop open state is untouched on mobile
    expect(getCapturedCtx().open).toBe(true);
  });
});
describe('Sidebar', () => {
  beforeEach(() => {
    mobileMock.isMobile = false;
    vi.clearAllMocks();
  });

  test('renders the desktop sidebar with default props', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar>
          <div data-testid="content">menu</div>
        </Sidebar>
      </SidebarProvider>
    );
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute('data-side', 'left');
    expect(sidebar).toHaveAttribute('data-variant', 'sidebar');
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
    expect(container.querySelector('[data-slot="sidebar-gap"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="sidebar-container"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="sidebar-inner"]')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  test('reflects a collapsed state', () => {
    const { container } = render(
      <SidebarProvider defaultOpen={false}>
        <Sidebar collapsible="icon" />
      </SidebarProvider>
    );
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(sidebar).toHaveAttribute('data-collapsible', 'icon');
  });

  test('renders side="right" layout', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar side="right" />
      </SidebarProvider>
    );
    expect(container.querySelector('[data-slot="sidebar"]')).toHaveAttribute('data-side', 'right');
  });

  test('renders the inset and floating variants', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar variant="inset" />
      </SidebarProvider>
    );
    expect(container.querySelector('[data-slot="sidebar"]')).toHaveAttribute('data-variant', 'inset');

    const { container: floating } = render(
      <SidebarProvider defaultOpen={false}>
        <Sidebar variant="floating" collapsible="icon" />
      </SidebarProvider>
    );
    expect(floating.querySelector('[data-slot="sidebar"]')).toHaveAttribute('data-variant', 'floating');
  });

  test('renders a simple sidebar when collapsible="none"', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <span data-testid="static">static</span>
        </Sidebar>
      </SidebarProvider>
    );
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toBeInTheDocument();
    // The "none" branch does not add data-side/variant/state/collapsible attrs
    expect(sidebar).not.toHaveAttribute('data-state');
    expect(screen.getByTestId('static')).toBeInTheDocument();
  });

  test('renders a mobile sheet when isMobile is true', () => {
    mobileMock.isMobile = true;
    const { container } = render(
      <SidebarProvider>
        <Sidebar side="right">
          <div data-testid="mobile-child">mobile</div>
        </Sidebar>
      </SidebarProvider>
    );
    const content = container.querySelector('[data-mobile="true"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-sidebar', 'sidebar');
    expect(screen.getByText('Sidebar')).toBeInTheDocument(); // SheetTitle
    expect(screen.getByText('Displays the mobile sidebar.')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-child')).toBeInTheDocument();
  });
});

describe('SidebarTrigger', () => {
  beforeEach(() => {
    mobileMock.isMobile = false;
    vi.clearAllMocks();
  });

  test('renders a button with trigger slot and panel icon', () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>
    );
    const trigger = container.querySelector('[data-slot="sidebar-trigger"]');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByTestId('panel-left-icon')).toBeInTheDocument();
    expect(screen.getByText('Toggle Sidebar')).toBeInTheDocument();
  });

  test('calls its own onClick then toggles the sidebar', () => {
    const onClick = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <SidebarProvider open onOpenChange={onOpenChange}>
        <SidebarTrigger onClick={onClick} />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('SidebarRail', () => {
  beforeEach(() => {
    mobileMock.isMobile = false;
    vi.clearAllMocks();
  });

  test('renders a toggle rail and toggles the sidebar on click', () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <SidebarProvider open onOpenChange={onOpenChange}>
        <Sidebar>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
    );
    const rail = container.querySelector('[data-slot="sidebar-rail"]') as HTMLElement;
    expect(rail).toBeInTheDocument();
    expect(rail).toHaveAttribute('aria-label', 'Toggle Sidebar');
    fireEvent.click(rail);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('applies a custom className', () => {
    const { container } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarRail className="custom-rail" />
        </Sidebar>
      </SidebarProvider>
    );
    expect(container.querySelector('[data-slot="sidebar-rail"]')).toHaveClass('custom-rail');
  });
});