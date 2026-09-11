import type { Meta, StoryObj } from '@storybook/react';
import { BattleScoreClient } from './battle-score-client';
import type { BattleScore } from '@/hooks/use-battle-score';

const STORAGE_KEY = 'battle-simulator-scores';

const meta: Meta<typeof BattleScoreClient> = {
  title: 'Battle Simulator/Battle Score Client',
  component: BattleScoreClient,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      // Seed localStorage before the component mounts so the
      // useBattleScore hook reads it during the story's render.
      const seedScores = context.parameters.seedScores as
        | BattleScore[]
        | undefined;
      if (seedScores) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedScores));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof BattleScoreClient>;

const makeScore = (
  id: number,
  result: 'win' | 'loss',
  playerPokemon: { name: string; sprite: string },
  opponentPokemon: { name: string; sprite: string },
  playerHP: number,
  opponentHP: number,
  date: string,
): BattleScore => ({
  id,
  date,
  result,
  playerPokemon,
  opponentPokemon,
  playerHP,
  opponentHP,
});

const bulbasaur = {
  name: 'bulbasaur',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
};
const charmander = {
  name: 'charmander',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png',
};
const pikachu = {
  name: 'pikachu',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
};
const gyarados = {
  name: 'gyarados',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/130.png',
};

const sampleScores: BattleScore[] = [
  makeScore(1, 'win', bulbasaur, charmander, 45, 0, '2026-01-15T12:00:00.000Z'),
  makeScore(2, 'loss', pikachu, gyarados, 0, 30, '2026-01-16T09:30:00.000Z'),
  makeScore(3, 'win', charmander, gyarados, 58, 12, '2026-01-18T18:45:00.000Z'),
  makeScore(4, 'win', pikachu, charmander, 22, 0, '2026-01-20T14:10:00.000Z'),
];

export const Empty: Story = {
  parameters: {
    seedScores: undefined,
  },
};

export const SingleWin: Story = {
  parameters: {
    seedScores: [sampleScores[0]],
  },
};

export const SingleLoss: Story = {
  parameters: {
    seedScores: [sampleScores[1]],
  },
};

export const WithHistory: Story = {
  parameters: {
    seedScores: sampleScores,
  },
};

export const LosingStreak: Story = {
  parameters: {
    seedScores: [
      makeScore(1, 'loss', bulbasaur, gyarados, 0, 55, '2026-02-01T10:00:00.000Z'),
      makeScore(2, 'loss', charmander, gyarados, 0, 20, '2026-02-02T11:00:00.000Z'),
      makeScore(3, 'loss', pikachu, gyarados, 0, 80, '2026-02-03T12:00:00.000Z'),
    ],
  },
};

export const WinningStreak: Story = {
  parameters: {
    seedScores: [
      makeScore(1, 'win', pikachu, charmander, 60, 0, '2026-03-01T08:00:00.000Z'),
      makeScore(2, 'win', charmander, gyarados, 35, 0, '2026-03-02T08:30:00.000Z'),
      makeScore(3, 'win', bulbasaur, pikachu, 70, 0, '2026-03-03T09:00:00.000Z'),
    ],
  },
};
