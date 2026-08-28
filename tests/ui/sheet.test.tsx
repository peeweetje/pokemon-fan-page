import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

// Radix Dialog positioning can rely on ResizeObserver, which jsdom does not
// provide. Install a no-op stand-in so portal content can mount in tests.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

beforeEach(() => {
  vi.clearAllMocks();
});

// A fully wired sheet whose open state is driven by internal React state, so the
// trigger -> content -> close flow can be exercised end to end.
function StatefulSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        Body content
        <SheetFooter>Footer content</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Helper rendering a controlled, always-open sheet. Radix portals attach to
// document.body, so content queries use the global document / screen.
function renderOpenSheet({ content = 'Sheet body' } = {}) {
  return render(
    <Sheet open>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet title</SheetTitle>
        {content}
      </SheetContent>
    </Sheet>
  );
}

describe('Sheet', () => {
  test('opens and closes through trigger and close button', async () => {
    render(<StatefulSheet />);

    // Closed by default: no dialog content in the portal
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Opening via the trigger mounts the content into the portal
    fireEvent.click(screen.getByRole('button', { name: 'Open sheet' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Sheet title')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();

    // Closing via the sr-only "Close" button unmounts the dialog
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('exposes open changes through onOpenChange', () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open={false} onOpenChange={onOpenChange}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>Panel</SheetContent>
      </Sheet>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

describe('SheetTrigger', () => {
  test('renders as a button carrying the sheet-trigger data-slot', () => {
    const { container } = render(
      <Sheet>
        <SheetTrigger>Open trigger</SheetTrigger>
      </Sheet>
    );
    const trigger = container.querySelector('[data-slot="sheet-trigger"]');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open trigger');
  });
});

describe('SheetContent', () => {
  test('renders the content with the sheet-content data-slot in the portal', () => {
    renderOpenSheet();
    const content = document.body.querySelector('[data-slot="sheet-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Sheet body');
  });

  test('renders the overlay alongside the content', () => {
    renderOpenSheet();
    expect(document.body.querySelector('[data-slot="sheet-overlay"]')).toBeInTheDocument();
  });

  test('renders a close button with an sr-only label inside the content', () => {
    renderOpenSheet();
    const content = document.body.querySelector('[data-slot="sheet-content"]');
    const close = screen.getByRole('button', { name: 'Close' });
    expect(close).toHaveTextContent('Close');
    expect(content).toContainElement(close);
  });

  test('clicking the close button reports a close via onOpenChange', () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet open onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetTitle>Closable</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('merges a custom className onto the content classes', () => {
    render(
      <Sheet open>
        <SheetContent className="custom-sheet-panel">
          <SheetTitle>Panel</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const content = document.body.querySelector('[data-slot="sheet-content"]');
    expect(content).toHaveClass('custom-sheet-panel');
    expect(content).toHaveClass('bg-background');
  });

  test('defaults to the right side classes', () => {
    renderOpenSheet();
    const content = document.body.querySelector('[data-slot="sheet-content"]');
    expect(content).toHaveClass('right-0');
    expect(content).toHaveClass('inset-y-0');
  });

describe('SheetClose', () => {
  test('renders as a button carrying the sheet-close data-slot', () => {
    const { container } = render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetClose aria-label="Close panel">Close me</SheetClose>
      </Sheet>
    );
    const close = container.querySelector('[data-slot="sheet-close"]');
    expect(close).toBeInTheDocument();
    expect(close).toHaveTextContent('Close me');
  });
});

describe('SheetHeader', () => {
  test('renders with the sheet-header data-slot and merges className', () => {
    const { container } = render(<SheetHeader className="my-header">Header</SheetHeader>);
    const header = container.querySelector('[data-slot="sheet-header"]');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('my-header');
    expect(header).toHaveTextContent('Header');
  });
});

describe('SheetFooter', () => {
  test('renders with the sheet-footer data-slot and merges className', () => {
    const { container } = render(<SheetFooter className="my-footer">Footer</SheetFooter>);
    const footer = container.querySelector('[data-slot="sheet-footer"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('my-footer');
    expect(footer).toHaveTextContent('Footer');
  });
});

describe('SheetTitle', () => {
  test('renders the title with the sheet-title data-slot', () => {
    renderOpenSheet();
    const title = document.body.querySelector('[data-slot="sheet-title"]');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Sheet title');
  });

  test('merges a custom className', () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetTitle className="heading">Panel title</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const title = document.body.querySelector('[data-slot="sheet-title"]');
    expect(title).toHaveClass('heading');
    expect(title).toHaveClass('font-semibold');
  });
});

describe('SheetDescription', () => {
  test('renders the description with the sheet-description data-slot and renders its text', () => {
    renderOpenSheet(); // renderOpenSheet renders a Title but no Description
    expect(document.body.querySelector('[data-slot="sheet-description"]')).not.toBeInTheDocument();

    render(
      <Sheet open>
        <SheetContent>
          <SheetDescription>Helper text</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    const description = document.body.querySelector('[data-slot="sheet-description"]');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Helper text');
  });
});
  test.each([
    ['left', 'left-0', 'border-r'],
    ['top', 'top-0', 'h-auto'],
    ['bottom', 'bottom-0', 'border-t'],
  ] as const)('applies the %s side classes', (side, positionClass, edgeClass) => {
    render(
      <Sheet open>
        <SheetContent side={side}>
          <SheetTitle>Panel</SheetTitle>
        </SheetContent>
      </Sheet>
    );
    const content = document.body.querySelector('[data-slot="sheet-content"]');
    expect(content).toHaveClass(positionClass);
    expect(content).toHaveClass(edgeClass);
  });
});