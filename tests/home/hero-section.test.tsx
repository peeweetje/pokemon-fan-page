import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import HeroSection from '@/app/home/hero-section';
import HeroPokeball from '@/app/home/hero-pokeball';

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders hero section with title and description', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    expect(screen.getByRole('heading', { name: 'Pokémon Adventure' })).toBeInTheDocument();
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Discover your next favorite Pokémon and explore the world of trainers.')).toBeInTheDocument();
  });

  test('renders Pokédex button', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    const button = screen.getByText('View Pokédex');
    expect(button).toBeInTheDocument();
  });

  test('calls onNavigate when Pokédex button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<HeroSection onNavigate={mockOnNavigate} />);

    const button = screen.getByText('View Pokédex');
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

  describe('HeroPokeball', () => {
    test('renders pokeball container and spinner', () => {
      render(<HeroPokeball />);

      expect(screen.getByTestId('hero-pokeball')).toBeInTheDocument();
      expect(screen.getByTestId('hero-pokeball-spinner')).toBeInTheDocument();
    });

    test('renders inside HeroSection', () => {
      const mockOnNavigate = vi.fn();
      render(<HeroSection onNavigate={mockOnNavigate} />);

      expect(screen.getByTestId('hero-pokeball')).toBeInTheDocument();
      expect(screen.getByTestId('hero-pokeball-spinner')).toBeInTheDocument();
    });

    test('applies md size classes when size="md"', () => {
      render(<HeroPokeball size="md" />);

      const spinner = screen.getByTestId('hero-pokeball-spinner');
      expect(spinner.className).toContain('w-48');
      expect(spinner.className).toContain('md:w-64');
    });

    test('applies lg size classes by default', () => {
      render(<HeroPokeball />);

      const spinner = screen.getByTestId('hero-pokeball-spinner');
      expect(spinner.className).toContain('w-64');
      expect(spinner.className).toContain('md:w-80');
    });

    test('renders floating wrapper for idle bob animation', () => {
      render(<HeroPokeball />);

      expect(screen.getByTestId('hero-pokeball-float')).toBeInTheDocument();
    });
  });

  describe('HeroSection animations', () => {
    test('renders staggered title words with gradient highlight', () => {
      const mockOnNavigate = vi.fn();
      render(<HeroSection onNavigate={mockOnNavigate} />);

      expect(screen.getByTestId('hero-title-word-0')).toHaveTextContent('Pokémon');
      expect(screen.getByTestId('hero-title-word-1')).toHaveTextContent('Adventure');

      const highlight = screen.getByTestId('hero-title-word-1').firstChild as HTMLElement;
      expect(highlight.className).toContain('bg-gradient-to-r');
      expect(highlight.className).toContain('bg-clip-text');
    });

    test('renders pulsing CTA wrapper', () => {
      const mockOnNavigate = vi.fn();
      render(<HeroSection onNavigate={mockOnNavigate} />);

      const pulse = screen.getByTestId('hero-cta-pulse');
      expect(pulse).toBeInTheDocument();
      expect(pulse).toContainElement(screen.getByText('View Pokédex'));
    });
  });
});