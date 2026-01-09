import type { Meta, StoryObj } from '@storybook/react';
import PokemonAbilities from './pokemon-abilities';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonAbilities> = {
    title: 'Pokemon/PokemonAbilities',
    component: PokemonAbilities,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonAbilities>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
    },
};
