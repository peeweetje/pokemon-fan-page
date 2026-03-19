import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { BattleSimulatorClient } from '@/app/battle-simulator/battle-simulator-client';
import { mockPokemonList } from './setup';

describe('BattleSimulatorClient', () => {
  test('renders without crashing', () => {
    render(<BattleSimulatorClient pokemonList={mockPokemonList} />);
    
    // Should render without errors
    expect(screen.getByTestId('pokemon-selection-screen')).toBeInTheDocument();
  });

  test('renders PokemonSelectionScreen when no player Pokemon is selected', () => {
    render(<BattleSimulatorClient pokemonList={mockPokemonList} />);
    
    expect(screen.getByTestId('pokemon-selection-screen')).toBeInTheDocument();
  });
});