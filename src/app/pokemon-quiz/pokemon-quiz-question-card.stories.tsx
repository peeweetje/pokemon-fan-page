import type { Meta, StoryObj } from '@storybook/react';
import { PokemonQuizQuestionCard } from './pokemon-quiz-question-card';


const meta = {
    title: 'Pokemon Quiz/Question Card',
    component: PokemonQuizQuestionCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onSelectAnswer: () => { },
        onNext: () => { },
    },
} satisfies Meta<typeof PokemonQuizQuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentQuestionIndex: 0,
        totalQuestions: 10,
        score: 0,
        question: 'Who is this Pokemon?',
        options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'],
        correctAnswer: 'Pikachu',
        explanation: 'It is Pikachu!',
        category: 'pikachu',
        selectedAnswer: null,
        showExplanation: false,
        hasNext: true,
    },
};

export const AnsweredCorrectly: Story = {
    args: {
        currentQuestionIndex: 0,
        totalQuestions: 10,
        score: 1,
        question: 'Who is this Pokemon?',
        options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'],
        correctAnswer: 'Pikachu',
        explanation: 'It is Pikachu!',
        category: 'pikachu',
        selectedAnswer: 'Pikachu',
        showExplanation: true,
        hasNext: true,
    },
};

export const AnsweredIncorrectly: Story = {
    args: {
        currentQuestionIndex: 0,
        totalQuestions: 10,
        score: 0,
        question: 'Who is this Pokemon?',
        options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'],
        correctAnswer: 'Pikachu',
        explanation: 'It is Pikachu!',
        category: 'pikachu',
        selectedAnswer: 'Charmander',
        showExplanation: true,
        hasNext: true,
    },
};

export const LastQuestion: Story = {
    args: {
        currentQuestionIndex: 9,
        totalQuestions: 10,
        score: 8,
        question: 'Who is this Pokemon?',
        options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'],
        correctAnswer: 'Pikachu',
        explanation: 'It is Pikachu!',
        category: 'pikachu',
        selectedAnswer: 'Pikachu',
        showExplanation: true,
        hasNext: false,
    },
};
