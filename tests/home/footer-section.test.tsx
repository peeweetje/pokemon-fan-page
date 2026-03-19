import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import FooterSection from '@/app/home/footer-section';

describe('FooterSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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