import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '@/app/home/hero-section';
import CardSections from '@/app/home/card-sections';
import CTASection from '@/app/home/cta-section';
import FooterSection from '@/app/home/footer-section';
import BackgroundPokeballs from '@/app/home/background-pokeballs';
import { featureCards } from '@/app/home/feature-cards';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, size }: any) => (
    <button className={className} onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronRight: ({ className }: any) => <svg className={className} />,
  Star: ({ className }: any) => <svg className={className} />,
  Swords: ({ className }: any) => <svg className={className} />,
  BookOpen: ({ className }: any) => <svg className={className} />,
}));

// Mock Enhanced3DPokeball component
vi.mock('@/components/pokeball-three', () => ({
  default: () => <div data-testid="3d-pokeball" />,
}));

describe('Home Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('HeroSection', () => {
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

  describe('CardSections', () => {
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

  describe('CTASection', () => {
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

  describe('FooterSection', () => {
    test('renders footer with copyright text', () => {
      render(<FooterSection />);

expect(screen.getByText((content, element) => {
  return content.startsWith('©') && content.includes('Pokémon Explorer') && content.includes('All rights reserved');
})).toBeInTheDocument();
     
    });

    test('renders trademark notice', () => {
      render(<FooterSection />);

      expect(screen.getByText(/Pokémon and Pokémon character names are trademarks of Nintendo/)).toBeInTheDocument();
    });

    test('renders 3D Pokeball component', () => {
      render(<FooterSection />);

      const pokeball = screen.getByTestId('3d-pokeball');
      expect(pokeball).toBeInTheDocument();
    });
  });

  describe('BackgroundPokeballs', () => {
    test('renders background pokeballs', () => {
      render(<BackgroundPokeballs />);
    });
  });

  describe('Feature Cards Data', () => {
    test('featureCards array has correct structure', () => {
      expect(featureCards).toHaveLength(6);
      
      featureCards.forEach(card => {
        expect(card).toHaveProperty('title');
        expect(card).toHaveProperty('description');
        expect(card).toHaveProperty('href');
        expect(card).toHaveProperty('icon');
        expect(card).toHaveProperty('bgColor');
        expect(card).toHaveProperty('iconBgColor');
        expect(card).toHaveProperty('iconColor');
        expect(card).toHaveProperty('delay');
      });
    });

    test('featureCards have correct hrefs', () => {
      const hrefs = featureCards.map(card => card.href);
      expect(hrefs).toContain('/pokedex');
      expect(hrefs).toContain('/game');
      expect(hrefs).toContain('/evolution-groups');
      expect(hrefs).toContain('/battle-simulator');
      expect(hrefs).toContain('/pokemon-quiz');
      expect(hrefs).toContain('/pokemon-guides');
    });

    test('featureCards have correct titles', () => {
      const titles = featureCards.map(card => card.title);
      expect(titles).toContain('Complete Pokédex');
      expect(titles).toContain('Memory Game');
      expect(titles).toContain('Evolution Groups');
      expect(titles).toContain('Battle Simulator');
      expect(titles).toContain('Pokemon Quiz');
      expect(titles).toContain('Pokemon Guides');
    });
  });
});