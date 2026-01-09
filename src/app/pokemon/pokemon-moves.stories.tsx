import type { Meta, StoryObj } from '@storybook/react';
import PokemonMoves from './pokemon-moves';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonMoves> = {
    title: 'Pokemon/PokemonMoves',
    component: PokemonMoves,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonMoves>;

export const Default: Story = {
    args: {
        moves: mockPokemon.moves,
    },
};
