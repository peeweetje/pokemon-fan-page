import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { getPokemonImage } from '../src/utils/get-pokemon-images';

describe('getPokemonImage', () => {
  const base =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  test.each([
    ['Basic Knowledge', `${base}/25.png`],
    ['Types', `${base}/6.png`],
    ['Evolutions', `${base}/149.png`],
    ['Legendary Pokemon', `${base}/150.png`],
    ['Abilities and Moves', `${base}/448.png`],
    ['Game Mechanics', `${base}/143.png`],
  ])('returns the artwork for %s', (category, expected) => {
    expect(getPokemonImage(category)).toBe(expected);
  });

  test('falls back to Pikachu for unknown categories', () => {
    expect(getPokemonImage('Something Else')).toBe(`${base}/25.png`);
  });
});
