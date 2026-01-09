import type { Meta, StoryObj } from '@storybook/react';
import PokemonImage from './pokemon-image';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonImage> = {
    title: 'Pokemon/PokemonImage',
    component: PokemonImage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonImage>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
        mainColor: '#F7D02C',
    },
};

export const FireType: Story = {
    args: {
        pokemon: { ...mockPokemon, id: 6, name: 'charizard' },
        mainColor: '#F08030',
    },
};
