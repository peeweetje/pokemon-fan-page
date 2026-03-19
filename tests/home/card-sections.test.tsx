import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import CardSections from '@/app/home/card-sections';
import { featureCards } from '@/app/home/feature-cards';

describe('CardSections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders section title', () => {
    render(
      <CardSections 
        title="Explore the Pokémon World" 
        cards={featureCards} 
      />
    );

    expect(screen.getByText('Explore the Pokémon World')).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    render(
      <CardSections 
        title="Explore the Pokémon World" 
        cards={featureCards} 
      />
    );

    // Check that all cards are rendered
    expect(screen.getAllByRole('link')).toHaveLength(featureCards.length);
  });

  test('renders card titles and descriptions', () => {
    render(
      <CardSections 
        title="Explore the Pokémon World" 
        cards={featureCards} 
      />
    );

    expect(screen.getByText('Complete Pokédex')).toBeInTheDocument();
    expect(screen.getByText('Browse through all Pokémon with detailed information about each species.')).toBeInTheDocument();
    
    expect(screen.getByText('Memory Game')).toBeInTheDocument();
    expect(screen.getByText('Test your memory with our fun Pokémon memory matching game.')).toBeInTheDocument();
  });


  test('renders correct number of cards', () => {
    render(
      <CardSections 
        title="Explore the Pokémon World" 
        cards={featureCards} 
      />
    );

    // Should render 6 cards
    const cardElements = screen.getAllByRole('link');
    expect(cardElements).toHaveLength(6);
  });
});