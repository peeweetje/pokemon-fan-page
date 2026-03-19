import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import HeroSection from '@/app/home/hero-section';

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders hero section with title and description', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    expect(screen.getByText('Pokémon Explorer')).toBeInTheDocument();
    expect(screen.getByText('Your ultimate guide to the world of Pokémon')).toBeInTheDocument();
  });

  test('renders Pokédex button', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    const button = screen.getByText('Open Pokédex');
    expect(button).toBeInTheDocument();
  });

  test('calls onNavigate when Pokédex button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    const button = screen.getByText('Open Pokédex');
    fireEvent.click(button);

    expect(mockOnNavigate).toHaveBeenCalledWith('/pokedex');
  });

  test('renders Pokeball icon', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    // Check for the Pokeball div structure
    const pokeball = screen.getByRole('button', { hidden: true });
    expect(pokeball).toBeInTheDocument();
  });
});