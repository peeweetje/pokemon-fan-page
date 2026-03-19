import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import CTASection from '@/app/home/cta-section';

describe('CTASection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders CTA section with title and description', () => {
    const mockOnNavigate = vi.fn();
    render(<CTASection onNavigate={mockOnNavigate} />);

    expect(screen.getByText('Ready to become a Pokémon Master?')).toBeInTheDocument();
    expect(screen.getByText(/Start your journey by exploring our comprehensive Pokédex/)).toBeInTheDocument();
  });

  test('renders Pokédex button', () => {
    const mockOnNavigate = vi.fn();
    render(<CTASection onNavigate={mockOnNavigate} />);

    const pokedexButton = screen.getByText('Go to Pokédex');
    expect(pokedexButton).toBeInTheDocument();
  });

  test('renders Memory Game button', () => {
    const mockOnNavigate = vi.fn();
    render(<CTASection onNavigate={mockOnNavigate} />);

    const gameButton = screen.getByText('Play Memory Game');
    expect(gameButton).toBeInTheDocument();
  });

  test('calls onNavigate when Pokédex button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<CTASection onNavigate={mockOnNavigate} />);

    const pokedexButton = screen.getByText('Go to Pokédex');
    fireEvent.click(pokedexButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('/pokedex');
  });

  test('calls onNavigate when Memory Game button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<CTASection onNavigate={mockOnNavigate} />);

    const gameButton = screen.getByText('Play Memory Game');
    fireEvent.click(gameButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('/game');
  });
});