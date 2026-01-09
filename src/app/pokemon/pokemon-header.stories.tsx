import type { Meta, StoryObj } from '@storybook/react';
import PokemonHeader from './pokemon-header';
import { mockPokemon, mockSpecies } from './fixtures';

const meta: Meta<typeof PokemonHeader> = {
    title: 'Pokemon/PokemonHeader',
    component: PokemonHeader,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonHeader>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
        species: mockSpecies,
        types: ['electric'],
        mainColor: '#F7D02C',
        formattedId: '#0025',
        category: 'Mouse Pokémon',
    },
};
