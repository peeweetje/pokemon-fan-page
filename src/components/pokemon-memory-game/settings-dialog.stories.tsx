import type { Meta, StoryObj } from '@storybook/react';
import { SettingsDialog } from './settings-dialog';


const meta = {
    title: 'Components/Pokemon Memory Game/Settings Dialog',
    component: SettingsDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        setDifficulty: () => { },
        setSoundEnabled: () => { },
        setAnimationsEnabled: () => { },
        onDifficultyChange: () => { },
    },
} satisfies Meta<typeof SettingsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        difficulty: 'medium',
        soundEnabled: true,
        animationsEnabled: true,
        prefersReducedMotion: false,
    },
};

export const ReducedMotionEnabled: Story = {
    args: {
        difficulty: 'easy',
        soundEnabled: false,
        animationsEnabled: false,
        prefersReducedMotion: true,
    },
};
