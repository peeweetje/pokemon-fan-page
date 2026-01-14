import type { Meta, StoryObj } from '@storybook/react';
import { PokemonQuizExplanation } from './pokemon-quiz-explanation';


const meta = {
    title: 'Pokemon Quiz/Explanation',
    component: PokemonQuizExplanation,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        explanation: { control: 'text' },
        show: { control: 'boolean' },
        hasNext: { control: 'boolean' },
    },
    args: {
        onNext: () => { },
    },
} satisfies Meta<typeof PokemonQuizExplanation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hidden: Story = {
    args: {
        explanation: 'This is an explanation.',
        show: false,
        hasNext: true,
    },
};

export const VisibleWithNext: Story = {
    args: {
        explanation: 'Correct! Pikachu is an Electric-type Pokemon.',
        show: true,
        hasNext: true,
    },
};

export const VisibleWithFinish: Story = {
    args: {
        explanation: 'Correct! Charmander is a Fire-type Pokemon. You have completed the quiz!',
        show: true,
        hasNext: false,
    },
};
