import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { EvolutionGroupGrid } from '@/app/evolution-groups/evolution-group-grid';
import { mockEvolutionGroups } from './setup';

describe('EvolutionGroupGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all evolution groups', () => {
    render(<EvolutionGroupGrid groups={mockEvolutionGroups} />);

    expect(screen.getByText('bulbasaur Evolution')).toBeInTheDocument();
    expect(screen.getByText('charmander Evolution')).toBeInTheDocument();
    expect(screen.getByText('squirtle Evolution')).toBeInTheDocument();
  });

  test('renders correct number of evolution cards', () => {
    render(<EvolutionGroupGrid groups={mockEvolutionGroups} />);

    const evolutionCards = screen.getAllByRole('img'); // Using images as a proxy for cards
    expect(evolutionCards.length).toBeGreaterThan(0);
  });
});