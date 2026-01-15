import type { Meta, StoryObj } from '@storybook/react';
import { PokemonTypes } from './pokemon-types';

const meta: Meta<typeof PokemonTypes> = {
    title: 'Components/Pokemon Card/Pokemon Types',
    component: PokemonTypes,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        types: { control: 'object' },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonTypes>;

export const SingleType: Story = {
    args: {
        types: ['grass'],
    },
};

export const DualType: Story = {
    args: {
        types: ['grass', 'poison'],
    },
};

export const Fire: Story = {
    args: {
        types: ['fire'],
    },
};

export const Water: Story = {
    args: {
        types: ['water'],
    },
};

export const UnknownType: Story = {
    args: {
        types: ['unknown'],
    },
};
