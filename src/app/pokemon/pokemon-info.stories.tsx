import type { Meta, StoryObj } from '@storybook/react';
import PokemonInfo from './pokemon-info';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonInfo> = {
    title: 'Pokemon/PokemonInfo',
    component: PokemonInfo,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonInfo>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
        types: ['electric'],
        formattedId: '#0025',
        category: 'Mouse Pokémon',
    },
};

export const MultiType: Story = {
    args: {
        pokemon: { ...mockPokemon, name: 'charizard' },
        types: ['fire', 'flying'],
        formattedId: '#0006',
        category: 'Flame Pokémon',
    },
};
