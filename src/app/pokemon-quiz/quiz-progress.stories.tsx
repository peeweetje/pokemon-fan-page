import type { Meta, StoryObj } from '@storybook/react';
import QuizProgress from './quiz-progress';

const meta = {
    title: 'Pokemon Quiz/Progress',
    component: QuizProgress,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof QuizProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
    args: {
        currentQuestion: 0,
        totalQuestions: 10,
        score: 0,
    },
};

export const Middle: Story = {
    args: {
        currentQuestion: 4,
        totalQuestions: 10,
        score: 3,
    },
};

export const End: Story = {
    args: {
        currentQuestion: 9,
        totalQuestions: 10,
        score: 8,
    },
};
