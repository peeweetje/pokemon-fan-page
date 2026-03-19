import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import BackgroundPokeballs from '@/app/home/background-pokeballs';

describe('BackgroundPokeballs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders background pokeballs', () => {
    render(<BackgroundPokeballs />);
  });
});