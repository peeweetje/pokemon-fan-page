import type { Meta, StoryObj } from '@storybook/react';
import { PokemonImage } from './pokemon-image';

const meta: Meta<typeof PokemonImage> = {
    title: 'Components/Pokemon Card/Pokemon Image',
    component: PokemonImage,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        id: { control: 'text' },
        name: { control: 'text' },
        isClicked: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonImage>;

export const Default: Story = {
    args: {
        id: '1',
        name: 'bulbasaur',
        isClicked: false,
    },
};

export const Clicked: Story = {
    args: {
        id: '1',
        name: 'bulbasaur',
        isClicked: true,
    },
};

export const Pikachu: Story = {
    args: {
        id: '25',
        name: 'pikachu',
        isClicked: false,
    },
};
