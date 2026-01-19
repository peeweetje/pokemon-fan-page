import type { Meta, StoryObj } from '@storybook/react';
import { ScoreDialog } from './score-dialog';


const mockHighScores = [
    { moves: 12, time: 65, date: '2023-10-01', difficulty: 'easy' },
    { moves: 14, time: 70, date: '2023-10-02', difficulty: 'easy' },
    { moves: 30, time: 120, date: '2023-10-03', difficulty: 'medium' },
    { moves: 45, time: 200, date: '2023-10-04', difficulty: 'hard' },
];

const meta = {
    title: 'Components/Pokemon Memory Game/Score Dialog',
    component: ScoreDialog,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        onPlayAgain: () => { },
    },
} satisfies Meta<typeof ScoreDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenEasy: Story = {
    args: {
        isOpen: true,
        moves: 10,
        formattedTime: '01:05',
        difficulty: 'easy',
        highScores: mockHighScores,
        showConfetti: true,
        shouldAnimate: true,
    },
};

export const OpenHard: Story = {
    args: {
        isOpen: true,
        moves: 50,
        formattedTime: '04:20',
        difficulty: 'hard',
        highScores: mockHighScores,
        showConfetti: false,
        shouldAnimate: true,
    },
};

export const NoAnimation: Story = {
    args: {
        isOpen: true,
        moves: 10,
        formattedTime: '01:05',
        difficulty: 'easy',
        highScores: mockHighScores,
        showConfetti: false,
        shouldAnimate: false,
    },
};
