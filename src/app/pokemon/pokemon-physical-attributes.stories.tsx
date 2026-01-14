import type { Meta, StoryObj } from '@storybook/react';
import PokemonPhysicalAttributes from './pokemon-physical-attributes';
import { mockPokemon } from './fixtures';

const meta: Meta<typeof PokemonPhysicalAttributes> = {
    title: 'Pokemon/Physical Attributes',
    component: PokemonPhysicalAttributes,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonPhysicalAttributes>;

export const Default: Story = {
    args: {
        pokemon: mockPokemon,
    },
};
