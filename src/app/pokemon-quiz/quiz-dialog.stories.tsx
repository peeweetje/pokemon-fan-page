import type { Meta, StoryObj } from '@storybook/react';
import { QuizDialog } from './quiz-dialog';


const meta = {
    title: 'Pokemon Quiz/QuizDialog',
    component: QuizDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onOpenChange: () => { },
    },
} satisfies Meta<typeof QuizDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PerfectScore: Story = {
    args: {
        open: true,
        score: 10,
        totalQuestions: 10,
    },
};

export const GreatScore: Story = {
    args: {
        open: true,
        score: 8,
        totalQuestions: 10,
    },
};

export const LowScore: Story = {
    args: {
        open: true,
        score: 3,
        totalQuestions: 10,
    },
};

export const Closed: Story = {
    args: {
        open: false,
        score: 0,
        totalQuestions: 10,
    },
};
