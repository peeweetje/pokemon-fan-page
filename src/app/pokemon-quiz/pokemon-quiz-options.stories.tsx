import type { Meta, StoryObj } from '@storybook/react';
import { PokemonQuizOptions } from './pokemon-quiz-options';


const meta = {
    title: 'Pokemon Quiz/Options',
    component: PokemonQuizOptions,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        selectedAnswer: { control: 'text' },
        showExplanation: { control: 'boolean' },
    },
    args: {
        options: ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu'],
        correctAnswer: 'Pikachu',
        onSelectAnswer: () => { },
    },
} satisfies Meta<typeof PokemonQuizOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unanswered: Story = {
    args: {
        selectedAnswer: null,
        showExplanation: false,
    },
};

export const CorrectAnswerSelected: Story = {
    args: {
        selectedAnswer: 'Pikachu',
        showExplanation: true,
    },
};

export const IncorrectAnswerSelected: Story = {
    args: {
        selectedAnswer: 'Charmander',
        showExplanation: true,
    },
};
