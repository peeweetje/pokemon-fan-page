import type { Meta, StoryObj } from '@storybook/react';
import { PokemonBattleDetails } from './pokemon-battle-details';

const meta: Meta<typeof PokemonBattleDetails> = {
  title: 'Battle Simulator/Battle Details',
  component: PokemonBattleDetails,
  tags: ['autodocs'],
  argTypes: {
    hp: { control: { type: 'range', min: 0, max: 100 } },
    isOpponent: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: '300px', border: '1px dashed #ccc', padding: '20px' }}>
        <p style={{ marginBottom: '10px' }}>Battle Arena</p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokemonBattleDetails>;

const mockPokemon = {
  name: 'pikachu',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
};

export const PlayerPokemon: Story = {
  args: {
    pokemon: mockPokemon,
    hp: 75,
    isOpponent: false,
  },
};

export const OpponentPokemon: Story = {
  args: {
    pokemon: mockPokemon,
    hp: 45,
    isOpponent: true,
  },
};

export const LowHP: Story = {
  args: {
    pokemon: mockPokemon,
    hp: 15,
    isOpponent: false,
  },
};

export const FullHP: Story = {
  args: {
    pokemon: mockPokemon,
    hp: 100,
    isOpponent: true,
  },
};


