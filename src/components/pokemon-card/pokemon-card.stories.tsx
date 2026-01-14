
import type { Meta, StoryObj } from '@storybook/react';
import { PokemonCard } from './pokemon-card';

const meta: Meta<typeof PokemonCard> = {
    title: 'Components/Pokemon Card',
    component: PokemonCard,
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
        },
        url: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
    args: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    parameters: {
        // Mock the usePokemonDetails hook response if possible, 
        // or rely on the real API since it's just a read operation.
        // For now we rely on the real API as we didn't setup MSW.
    },
};

export const Pikachu: Story = {
    args: {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
};

export const Charizard: Story = {
    args: {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
};
