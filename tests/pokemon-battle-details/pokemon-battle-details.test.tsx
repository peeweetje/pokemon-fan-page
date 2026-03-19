import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { PokemonBattleDetails } from '@/app/battle-simulator/pokemon-battle-details';
import { mockPokemon } from './setup';

describe('PokemonBattleDetails', () => {
  test('renders Pokemon details when pokemon is provided', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={75} 
        isOpponent={false} 
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  test('renders opponent Pokemon details with correct positioning', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={50} 
        isOpponent={true} 
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    
    // Check that opponent has correct positioning class
    const container = screen.getByText('bulbasaur').closest('div');
    expect(container).toHaveClass('text-right');
  });

  test('does not render when pokemon is null', () => {
    render(
      <PokemonBattleDetails 
        pokemon={null} 
        hp={100} 
        isOpponent={false} 
      />
    );

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  test('does not render when pokemon is undefined', () => {
    render(
      <PokemonBattleDetails 
        pokemon={undefined} 
        hp={100} 
        isOpponent={false} 
      />
    );

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  test('displays correct HP percentage', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={25} 
        isOpponent={false} 
      />
    );

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('displays 0% when HP is 0', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={0} 
        isOpponent={false} 
      />
    );

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('displays 100% when HP is 100', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={100} 
        isOpponent={false} 
      />
    );

    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('renders Pokemon sprite', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={75} 
        isOpponent={false} 
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/bulbasaur.png');
    expect(img).toHaveAttribute('alt', 'bulbasaur');
  });

  test('has correct structure for player Pokemon', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={75} 
        isOpponent={false} 
      />
    );

    const container = screen.getByText('bulbasaur').closest('div');
    expect(container).not.toHaveClass('text-right');
  });

  test('has correct structure for opponent Pokemon', () => {
    render(
      <PokemonBattleDetails 
        pokemon={mockPokemon} 
        hp={75} 
        isOpponent={true} 
      />
    );

    const container = screen.getByText('bulbasaur').closest('div');
    expect(container).toHaveClass('text-right');
  });
});