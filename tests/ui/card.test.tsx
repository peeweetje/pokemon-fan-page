import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with the card data-slot', () => {
    const { container } = render(<Card />);
    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
  });

  test('renders its children', () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText('Card body')).toBeInTheDocument();
  });

  test('merges a custom className onto the base classes', () => {
    const { container } = render(<Card className="custom-card-class" />);
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass('custom-card-class');
    expect(card).toHaveClass('rounded-xl');
  });

  test('forwards additional DOM props', () => {
    const onClick = vi.fn();
    const { container } = render(<Card id="deck-card" onClick={onClick} />);
    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    expect(card).toHaveAttribute('id', 'deck-card');
    card.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('CardHeader', () => {
  test('renders with the card-header data-slot', () => {
    const { container } = render(<CardHeader />);
    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
  });

  test('renders its children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  test('merges a custom className', () => {
    const { container } = render(<CardHeader className="my-header" />);
    expect(container.querySelector('[data-slot="card-header"]')).toHaveClass('my-header');
  });
});

describe('CardTitle', () => {
  test('renders with the card-title data-slot', () => {
    const { container } = render(<CardTitle>My Title</CardTitle>);
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('My Title');
  });

  test('merges a custom className', () => {
    const { container } = render(<CardTitle className="heading" />);
    expect(container.querySelector('[data-slot="card-title"]')).toHaveClass('heading');
  });
});

describe('CardDescription', () => {
  test('renders with the card-description data-slot', () => {
    const { container } = render(<CardDescription>Some description</CardDescription>);
    const description = container.querySelector('[data-slot="card-description"]');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Some description');
  });

  test('merges a custom className', () => {
    const { container } = render(<CardDescription className="muted" />);
    expect(container.querySelector('[data-slot="card-description"]')).toHaveClass('muted');
  });
});

describe('CardAction', () => {
  test('renders with the card-action data-slot', () => {
    const { container } = render(<CardAction>Action</CardAction>);
    const action = container.querySelector('[data-slot="card-action"]');
    expect(action).toBeInTheDocument();
    expect(action).toHaveTextContent('Action');
  });

  test('merges a custom className', () => {
    const { container } = render(<CardAction className="action-btn" />);
    expect(container.querySelector('[data-slot="card-action"]')).toHaveClass('action-btn');
  });
});

describe('CardContent', () => {
  test('renders with the card-content data-slot', () => {
    const { container } = render(<CardContent>Body content</CardContent>);
    const content = container.querySelector('[data-slot="card-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Body content');
  });

  test('merges a custom className', () => {
    const { container } = render(<CardContent className="content-area" />);
    expect(container.querySelector('[data-slot="card-content"]')).toHaveClass('content-area');
  });
});

describe('CardFooter', () => {
  test('renders with the card-footer data-slot', () => {
    const { container } = render(<CardFooter>Footer content</CardFooter>);
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Footer content');
  });

  test('merges a custom className', () => {
    const { container } = render(<CardFooter className="foot" />);
    expect(container.querySelector('[data-slot="card-footer"]')).toHaveClass('foot');
  });
});

describe('Card composition', () => {
  test('composes a full card from all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Bulbasaur</CardTitle>
          <CardDescription>The Seed Pokemon</CardDescription>
        </CardHeader>
        <CardContent>Grass / Poison</CardContent>
        <CardFooter>Height: 0.7m</CardFooter>
      </Card>
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('The Seed Pokemon')).toBeInTheDocument();
    expect(screen.getByText('Grass / Poison')).toBeInTheDocument();
    expect(screen.getByText('Height: 0.7m')).toBeInTheDocument();
  });
});