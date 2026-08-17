import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonCardSkeleton } from '../../src/components/loading/pokemon-card-skeleton';

describe('PokemonCardSkeleton', () => {
  test('renders the outer container with the card styling classes', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const outer = container.querySelector('.border-2');
    expect(outer).not.toBeNull();
    expect(outer?.className).toContain('border-gray-200');
    expect(outer?.className).toContain('rounded-md');
    expect(outer?.className).toContain('overflow-hidden');
    expect(outer?.className).toContain('h-full');
  });

  test('renders eight skeleton placeholder divs', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const placeholders = container.querySelectorAll('.bg-gray-200');
    // 1 ID + 1 image + 1 name + 2 types + 3 stats
    expect(placeholders).toHaveLength(8);
  });

  test('renders the Pokemon ID skeleton with the expected dimensions', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const idSkeleton = container.querySelectorAll('.bg-gray-200')[0] as HTMLElement;
    expect(idSkeleton).toHaveStyle('width: 40px');
    expect(idSkeleton).toHaveStyle('height: 12px');
  });

  test('renders the Pokemon image skeleton as a circle', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const imageSkeleton = container.querySelectorAll('.bg-gray-200')[1] as HTMLElement;
    expect(imageSkeleton.className).toContain('rounded-full');
    expect(imageSkeleton).toHaveStyle('width: 96px');
    expect(imageSkeleton).toHaveStyle('height: 96px');
  });

  test('renders the name skeleton with the mb-1 spacing class', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const nameSkeleton = container.querySelectorAll('.bg-gray-200')[2] as HTMLElement;
    expect(nameSkeleton.className).toContain('mb-1');
    expect(nameSkeleton).toHaveStyle('width: 80px');
    expect(nameSkeleton).toHaveStyle('height: 20px');
  });

  test('renders two type skeletons styled as pills', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const typeSkeletons = container.querySelectorAll('.bg-gray-200');
    const typeOne = typeSkeletons[3] as HTMLElement;
    const typeTwo = typeSkeletons[4] as HTMLElement;
    expect(typeOne.className).toContain('rounded-full');
    expect(typeOne).toHaveStyle('width: 60px');
    expect(typeOne).toHaveStyle('height: 24px');
    expect(typeTwo.className).toContain('rounded-full');
    expect(typeTwo).toHaveStyle('width: 60px');
    expect(typeTwo).toHaveStyle('height: 24px');
  });

  test('renders three stat skeletons placed in a grid of three columns', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const statGrid = container.querySelector('.grid.grid-cols-3');
    expect(statGrid?.className).toContain('text-center');
    // The stat cells live inside the grid, one per column.
    expect(statGrid?.querySelectorAll('.bg-gray-200')).toHaveLength(3);
  });

  test('each stat skeleton has the expected dimensions and centering', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const statSkeletons = container.querySelectorAll('.bg-gray-200');
    const statOne = statSkeletons[5] as HTMLElement;
    const statTwo = statSkeletons[6] as HTMLElement;
    const statThree = statSkeletons[7] as HTMLElement;
    for (const stat of [statOne, statTwo, statThree]) {
      expect(stat.className).toContain('mx-auto');
      expect(stat).toHaveStyle('width: 32px');
      expect(stat).toHaveStyle('height: 16px');
    }
  });

  test('renders the HP, ATK and DEF stat labels', () => {
    render(<PokemonCardSkeleton />);
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('ATK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
  });

  test('contains the info section with its border and background classes', () => {
    const { container } = render(<PokemonCardSkeleton />);
    const infoSection = container.querySelector('.rounded-t-xl');
    expect(infoSection?.className).toContain('border-t');
    expect(infoSection?.className).toContain('border-gray-200');
    expect(infoSection?.className).toContain('bg-white');
    expect(infoSection?.className).toContain('flex-col');
  });
});
