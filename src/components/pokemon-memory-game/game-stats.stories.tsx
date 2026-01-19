import type { Meta, StoryObj } from '@storybook/react';
import { GameStats } from './game-stats';

const meta = {
    title: 'Components/Pokemon Memory Game/Game Stats',
    component: GameStats,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        moves: { control: 'number' },
        formattedTime: { control: 'text' },
        difficulty: {
            control: 'select',
            options: ['easy', 'medium', 'hard'],
        },
    },
} satisfies Meta<typeof GameStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EasyStart: Story = {
    args: {
        moves: 0,
        formattedTime: '00:00',
        difficulty: 'easy',
    },
};

export const MediumProgress: Story = {
    args: {
        moves: 15,
        formattedTime: '01:23',
        difficulty: 'medium',
    },
};

export const HardExpert: Story = {
    args: {
        moves: 45,
        formattedTime: '03:45',
        difficulty: 'hard',
    },
};
