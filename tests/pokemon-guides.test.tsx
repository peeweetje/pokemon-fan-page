import { describe, test, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
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

    test('renders the training section gradient', () => {
      const { container } = render(
        <GuideContentCard
          title="Training Title"
          content="Training Content"
          activeSection="training"
          index={0}
        />
      );
      expect(screen.getByText('Training Content')).toBeInTheDocument();
      expect(container.querySelector('.from-yellow-400')).not.toBeNull();
    });

    test('renders the competitive section gradient', () => {
      const { container } = render(
        <GuideContentCard
          title="Comp Title"
          content="Comp Content"
          activeSection="competitive"
          index={0}
        />
      );
      expect(screen.getByText('Comp Content')).toBeInTheDocument();
      expect(container.querySelector('.from-red-400')).not.toBeNull();
    });

    test('renders the default gradient for an unknown section', () => {
      const { container } = render(
        <GuideContentCard
          title="Shiny Title"
          content="Shiny Content"
          activeSection="shiny"
          index={0}
        />
      );
      expect(screen.getByText('Shiny Content')).toBeInTheDocument();
      expect(container.querySelector('.from-purple-400')).not.toBeNull();
    });
  });

  describe('PokemonGuidesSidebar', () => {
    const sections = [
      { id: 'tips', title: 'Tips', icon: '📘' },
      { id: 'walkthroughs', title: 'Walkthroughs', icon: '🎯' },
      { id: 'training', title: 'Training', icon: '⚡' },
      { id: 'competitive', title: 'Competitive', icon: '🏆' },
      { id: 'shiny', title: 'Shiny', icon: '✨' },
    ];

    const renderSidebar = (overrides: any = {}) => {
      const setActiveSection = vi.fn();
      const setIsMobileMenuOpen = vi.fn();
      const setIsNavigating = vi.fn();
      const utils = render(
        <PokemonGuidesSidebar
          sections={sections}
          activeSection={overrides.activeSection ?? 'tips'}
          setActiveSection={setActiveSection}
          isMobileMenuOpen={overrides.isMobileMenuOpen ?? false}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsNavigating={setIsNavigating}
          children={<div>Test Content</div>}
        />
      );
      return { utils, setActiveSection, setIsMobileMenuOpen, setIsNavigating };
    };

    test('renders all section buttons and the main content', () => {
      renderSidebar({ activeSection: 'tips' });

      expect(screen.getByRole('button', { name: /Tips/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Walkthroughs/ })).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders the desktop sidebar for every active section', () => {
      ['tips', 'walkthroughs', 'training', 'competitive', 'shiny'].forEach((section) => {
        const { utils } = renderSidebar({ activeSection: section });
        expect(utils.container.querySelector('.fixed.inset-0')).toBeNull();
        expect(within(utils.container).getByText('Test Content')).toBeInTheDocument();
      });
    });

    test('renders the mobile drawer for every active section', () => {
      ['tips', 'walkthroughs', 'training', 'competitive', 'shiny'].forEach((section) => {
        const { utils, } = renderSidebar({
          activeSection: section,
          isMobileMenuOpen: true,
        });
        const drawer = utils.container.querySelector('.fixed.inset-0') as HTMLElement;
        expect(drawer).not.toBeNull();
        expect(within(drawer).getByText('Menu')).toBeInTheDocument();
        expect(within(drawer).getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
        
      });
    });

    test('clicking a desktop section button calls setActiveSection', () => {
      const { setActiveSection } = renderSidebar({ activeSection: 'tips' });

      fireEvent.click(screen.getByRole('button', { name: /Walkthroughs/ }));
      expect(setActiveSection).toHaveBeenCalledWith('walkthroughs');
    });

    test('clicking a mobile drawer section button sets active and closes the menu', () => {
      const { utils, setActiveSection, setIsMobileMenuOpen } = renderSidebar({
        activeSection: 'tips',
        isMobileMenuOpen: true,
      });

      const drawer = utils.container.querySelector('.fixed.inset-0') as HTMLElement;
      const walkthroughsBtn = within(drawer).getByRole('button', { name: /Walkthroughs/ });
      fireEvent.click(walkthroughsBtn);

      expect(setActiveSection).toHaveBeenCalledWith('walkthroughs');
      expect(setIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    test('closing the mobile drawer via overlay click closes the menu', () => {
      const { utils, setIsMobileMenuOpen } = renderSidebar({
        activeSection: 'tips',
        isMobileMenuOpen: true,
      });

      const overlay = utils.container.querySelector('.fixed.inset-0') as HTMLElement;
      fireEvent.click(overlay);
      expect(setIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    test('clicking a back button calls setIsNavigating', () => {
      const { utils, setIsNavigating } = renderSidebar({ activeSection: 'tips' });

      const backLink = utils.container.querySelector('a[href="/"]') as HTMLElement;
      fireEvent.click(backLink);
      expect(setIsNavigating).toHaveBeenCalledWith(true);
    });

    test('clicking the Open menu button opens the mobile menu', () => {
      const { setIsMobileMenuOpen } = renderSidebar({ activeSection: 'tips' });

      const openMenuButton = screen.getByRole('button', { name: 'Open menu' });
      fireEvent.click(openMenuButton);
      expect(setIsMobileMenuOpen).toHaveBeenCalledWith(true);
    });

    test('clicking the mobile drawer Close menu button closes the menu', () => {
      const { utils, setIsMobileMenuOpen } = renderSidebar({
        activeSection: 'tips',
        isMobileMenuOpen: true,
      });

      const drawer = utils.container.querySelector('.fixed.inset-0') as HTMLElement;
      const closeButton = within(drawer).getByRole('button', { name: 'Close menu' });
      fireEvent.click(closeButton);
      expect(setIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    test('clicking the mobile drawer back button calls setIsNavigating', () => {
      const { utils, setIsNavigating } = renderSidebar({
        activeSection: 'tips',
        isMobileMenuOpen: true,
      });

      const drawer = utils.container.querySelector('.fixed.inset-0') as HTMLElement;
      const drawerBack = within(drawer).getByRole('link', { name: 'Back to Home' });
      fireEvent.click(drawerBack);
      expect(setIsNavigating).toHaveBeenCalledWith(true);
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