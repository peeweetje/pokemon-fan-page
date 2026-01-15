import type { Meta, StoryObj } from '@storybook/react';
import { PokemonName } from './pokemon-name';

const meta: Meta<typeof PokemonName> = {
    title: 'Components/Pokemon Card/Pokemon Name',
    component: PokemonName,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        name: { control: 'text' },
        isClicked: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonName>;

export const Default: Story = {
    args: {
        name: 'bulbasaur',
        isClicked: false,
    },
};

export const Clicked: Story = {
    args: {
        name: 'bulbasaur',
        isClicked: true,
    },
};

export const LongName: Story = {
    args: {
        name: 'mr-mime',
        isClicked: false,
    },
};
