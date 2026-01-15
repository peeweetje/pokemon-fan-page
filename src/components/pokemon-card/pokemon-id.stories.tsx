import type { Meta, StoryObj } from '@storybook/react';
import { PokemonId } from './pokemon-id';

const meta: Meta<typeof PokemonId> = {
    title: 'Components/Pokemon Card/Pokemon Id',
    component: PokemonId,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'The ID of the Pokemon',
        },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonId>;

export const SingleDigit: Story = {
    args: {
        id: '1',
    },
};

export const DoubleDigit: Story = {
    args: {
        id: '25',
    },
};

export const TripleDigit: Story = {
    args: {
        id: '150',
    },
};

export const NullId: Story = {
    args: {
        id: null,
    },
};
