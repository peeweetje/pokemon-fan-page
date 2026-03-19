import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import './setup';
import { featureCards } from '@/app/home/feature-cards';

describe('Feature Cards Data', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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