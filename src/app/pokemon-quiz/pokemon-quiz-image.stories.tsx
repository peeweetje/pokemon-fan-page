import type { Meta, StoryObj } from '@storybook/react';
import { PokemonQuizImage } from './pokemon-quiz-image';

const meta = {
    title: 'Pokemon Quiz/Image',
    component: PokemonQuizImage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        category: { control: 'text' },
    },
} satisfies Meta<typeof PokemonQuizImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        category: 'pikachu',
    },
};

export const Charmander: Story = {
    args: {
        category: 'charmander',
    },
};

export const Squirtle: Story = {
    args: {
        category: 'squirtle',
    },
};
