import type { Meta, StoryObj } from '@storybook/react';
import PokemonStats from './pokemon-stats';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonStats> = {
    title: 'Pokemon/Stats',
    component: PokemonStats,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonStats>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
        maxStat: 255,
    },
};
