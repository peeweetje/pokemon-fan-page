import type { Meta, StoryObj } from '@storybook/react';
import { EvolutionCard } from './evolution-card';
import type { EvolutionGroup } from './evolution-types';

const bulbasaurLine: EvolutionGroup = {
  id: 1,
  name: 'bulbasaur',
  pokemon: [
    {
      id: 1,
      name: 'bulbasaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
      types: ['grass', 'poison'],
    },
    {
      id: 2,
      name: 'ivysaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png',
      types: ['grass', 'poison'],
    },
    {
      id: 3,
      name: 'venusaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png',
      types: ['grass', 'poison'],
    },
  ],
};

const charmanderLine: EvolutionGroup = {
  id: 2,
  name: 'charmander',
  pokemon: [
    {
      id: 4,
      name: 'charmander',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png',
      types: ['fire'],
    },
    {
      id: 5,
      name: 'charmeleon',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png',
      types: ['fire'],
    },
    {
      id: 6,
      name: 'charizard',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png',
      types: ['fire', 'flying'],
    },
  ],
};

const pikachuLine: EvolutionGroup = {
  id: 3,
  name: 'pikachu',
  pokemon: [
    {
      id: 25,
      name: 'pikachu',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
      types: ['electric'],
    },
    {
      id: 26,
      name: 'raichu',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png',
      types: ['electric'],
    },
  ],
};

const meta: Meta<typeof EvolutionCard> = {
  title: 'Evolution Groups/Evolution Card',
  component: EvolutionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    group: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EvolutionCard>;

export const GrassLine: Story = {
  args: {
    group: bulbasaurLine,
  },
};

export const FireLine: Story = {
  args: {
    group: charmanderLine,
  },
};

export const TwoStageLine: Story = {
  args: {
    group: pikachuLine,
  },
};
