import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { MemoryCard } from '@/components/pokemon-memory-game/memory-card';
import { cardBacks } from '@/utils/memory-game-helper';

const makeCard = (overrides = {}) => ({
  id: 7,
  pokemonId: 25,
  isFlipped: false,
  isMatched: false,
  ...overrides,
});

const renderCard = (card = makeCard(), shouldAnimate = true) => {
  const onClick = vi.fn();
  const utils = render(
    <MemoryCard
      card={card}
      difficulty="easy"
      selectedCardBack={0}
      shouldAnimate={shouldAnimate}
      onClick={onClick}
    />,
  );
  return { onClick, ...utils };
};

describe('MemoryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the card back when not flipped or matched', () => {
    const { container } = renderCard();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.innerHTML).toContain(cardBacks.easy[0]);
  });

  test('renders the pokemon front face when flipped', () => {
    renderCard(makeCard({ isFlipped: true }));
    const img = screen.getByRole('img', { name: 'Pokemon 25' });
    expect(img).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    );
  });

  test('renders the pokemon front face without animation props when disabled', () => {
    renderCard(makeCard({ isFlipped: true }), false);
    expect(screen.getByRole('img', { name: 'Pokemon 25' })).toBeInTheDocument();
  });

  test('renders the pokemon front face when matched', () => {
    renderCard(makeCard({ isMatched: true }));
    expect(screen.getByRole('img', { name: 'Pokemon 25' })).toBeInTheDocument();
  });

  test('applies the matched ring styling', () => {
    const { container } = renderCard(makeCard({ isMatched: true }));
    expect(container.innerHTML).toContain('ring-4');
    expect(container.innerHTML).toContain('ring-green-500');
  });

  test('calls onClick with the card id when clicked', () => {
    const { onClick, container } = renderCard();
    fireEvent.click(container.firstChild!.firstChild as Element);
    expect(onClick).toHaveBeenCalledWith(7);
  });

  test('does not apply hover animation styles when animations are disabled', () => {
    const { container } = renderCard(makeCard(), false);
    expect(container.innerHTML).not.toContain('animate-pulse');
    expect(container.innerHTML).not.toContain('animate-ping');
  });

  test('applies decorative animation classes when animations are enabled', () => {
    const { container } = renderCard(makeCard(), true);
    expect(container.innerHTML).toContain('animate-pulse');
    expect(container.innerHTML).toContain('animate-ping');
  });
});
