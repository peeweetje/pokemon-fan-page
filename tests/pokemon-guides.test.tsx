import { describe, test, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedPokeball from '@/app/pokemon-guides/animated-pokeball';
import FloatingParticles from '@/app/pokemon-guides/floating-particles';
import GuideContentCard from '@/app/pokemon-guides/guide-content-card';
import PokemonGuidesSidebar from '@/app/pokemon-guides/pokemon-guides-sidebar';
import QuickTips from '@/app/pokemon-guides/quick-tips';

describe('Pokemon Guides Components', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AnimatedPokeball', () => {
    test('renders with default props', () => {
      render(<AnimatedPokeball />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();
    });

    test('renders with different sizes', () => {
      const { rerender } = render(<AnimatedPokeball size="small" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball size="medium" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball size="large" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();
    });

    test('renders with different animation types', () => {
      const { rerender } = render(<AnimatedPokeball animationType="float" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball animationType="scale" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball animationType="rotate-scale" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball animationType="combined" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();

      rerender(<AnimatedPokeball animationType="rotate" />);
      expect(screen.getByTestId('animated-pokeball')).toBeInTheDocument();
    });
  });

  describe('FloatingParticles', () => {
    test('renders with default props', () => {
      render(<FloatingParticles />);
      expect(screen.getByTestId('floating-particles')).toBeInTheDocument();
    });

    test('renders with custom count', () => {
      render(<FloatingParticles count={5} />);
      expect(screen.getAllByTestId('floating-particle')).toHaveLength(5);
    });

    test('renders with custom animation duration', () => {
      render(<FloatingParticles animationDuration={5} />);
      expect(screen.getByTestId('floating-particles')).toBeInTheDocument();
    });
  });

  describe('GuideContentCard', () => {
    test('renders with required props', () => {
      render(
        <GuideContentCard
          title="Test Title"
          content="Test Content"
          activeSection="tips"
          index={0}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders with different active sections', () => {
      render(
        <GuideContentCard
          title="Test Title"
          content="Test Content"
          activeSection="walkthroughs"
          index={0}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
  });

  describe('PokemonGuidesSidebar', () => {
    test('renders with sections', () => {
      const sections = [
        { id: 'tips', title: 'Tips', icon: 'BookOpen' },
        { id: 'walkthroughs', title: 'Walkthroughs', icon: 'Target' },
      ];
      const setActiveSection = vi.fn();
      const setIsMobileMenuOpen = vi.fn();
      const setIsNavigating = vi.fn();

      render(
        <PokemonGuidesSidebar
          sections={sections}
          activeSection="tips"
          setActiveSection={setActiveSection}
          isMobileMenuOpen={false}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsNavigating={setIsNavigating}
          children={<div>Test Content</div>}
        />
      );

      expect(screen.getByRole('button', { name: /Tips$/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Walkthroughs$/ })).toBeInTheDocument();
    });

    test('handles mobile menu close button', () => {
      const sections = [
        { id: 'tips', title: 'Tips', icon: 'BookOpen' },
      ];
      const setActiveSection = vi.fn();
      const setIsMobileMenuOpen = vi.fn();
      const setIsNavigating = vi.fn();

      render(
        <PokemonGuidesSidebar
          sections={sections}
          activeSection="tips"
          setActiveSection={setActiveSection}
          isMobileMenuOpen={true}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsNavigating={setIsNavigating}
          children={<div>Test Content</div>}
        />
      );

      const closeButton = screen.getByRole('button', { name: 'Close menu' });
      fireEvent.click(closeButton);
      expect(setIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('QuickTips', () => {
    test('renders quick tips list', () => {
      render(<QuickTips />);
      expect(screen.getByText('Quick Tips')).toBeInTheDocument();
      expect(screen.getByText(/Save your game frequently/)).toBeInTheDocument();
    });
  });
});