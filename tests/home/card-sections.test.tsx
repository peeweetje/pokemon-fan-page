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

    // Each card renders 2 links: a clickable title and a CTA link
    expect(screen.getAllByRole('link')).toHaveLength(featureCards.length * 2);
  });

  test('renders the linkText for each card', () => {
    render(
      <CardSections 
        title="Explore the Pokémon World" 
        cards={featureCards} 
      />
    );

    expect(screen.getByText('Go to Pokédex →')).toBeInTheDocument();
    expect(screen.getByText('Play Now →')).toBeInTheDocument();
    expect(screen.getByText('View Evolutions →')).toBeInTheDocument();
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

    // Should render 6 cards (2 links each: title + CTA)
    const cardElements = screen.getAllByRole('link');
    expect(cardElements).toHaveLength(12);
  });
});