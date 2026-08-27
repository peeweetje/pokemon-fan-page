import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

// Radix TooltipContent measures its size with ResizeObserver, which jsdom does not
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

// Helper that renders a tooltip opened via the controlled `open` prop so the portal
// content mounts deterministically in jsdom. Radix portals attach to document.body,
// so content queries use `screen` / the global document, not the render container.
function renderOpenTooltip({ content = 'Release the hidden info' } = {}) {
  return render(
    <Tooltip open>
      <TooltipTrigger>Hover over me</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

describe('TooltipProvider', () => {
  test('passes its children through the provider context', () => {
    render(
      <TooltipProvider>
        <span>child</span>
      </TooltipProvider>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});

describe('Tooltip', () => {
  test('wraps children in a provider so a tooltip works standalone', () => {
    render(
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
      </Tooltip>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  test('opens and exposes both trigger and content without a manual provider', () => {
    renderOpenTooltip({ content: 'Standalone content' });
    expect(screen.getByText('Hover over me')).toBeInTheDocument();
    expect(screen.getByText('Standalone content')).toBeInTheDocument();
  });
});

describe('TooltipTrigger', () => {
  test('renders as a button carrying the tooltip-trigger data-slot', () => {
    const { container } = render(
      <Tooltip>
        <TooltipTrigger>Hover here</TooltipTrigger>
      </Tooltip>
    );
    const trigger = container.querySelector('[data-slot="tooltip-trigger"]');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Hover here');
  });
});

describe('TooltipContent', () => {
  test('renders the content with the tooltip-content data-slot', () => {
    renderOpenTooltip();
    const content = document.body.querySelector('[data-slot="tooltip-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Release the hidden info');
  });

  test('renders its children', () => {
    renderOpenTooltip({ content: 'Grass Pokemon are cool' });
    expect(screen.getByText('Grass Pokemon are cool')).toBeInTheDocument();
  });

  test('merges a custom className onto the base content classes', () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent className="custom-tooltip-body">Body</TooltipContent>
      </Tooltip>
    );
    const content = document.body.querySelector('[data-slot="tooltip-content"]');
    expect(content).toHaveClass('custom-tooltip-body');
    expect(content).toHaveClass('rounded-md');
    expect(content).toHaveClass('bg-primary');
  });

  test('renders the arrow indicator alongside the content', () => {
    renderOpenTooltip();
    const content = document.body.querySelector('[data-slot="tooltip-content"]');
    // The Radix arrow renders as an svg inside the content wrapper
    expect(content?.querySelector('svg')).toBeInTheDocument();
  });
});