import type { Meta, StoryObj } from '@storybook/react';
import { ConfettiEffect } from './confetti-effect';

const meta = {
    title: 'Components/Pokemon Memory Game/Confetti Effect',
    component: ConfettiEffect,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        showConfetti: { control: 'boolean' },
        shouldAnimate: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div className="h-screen w-full bg-slate-900 relative p-8">
                <h1 className="text-white text-3xl text-center mb-4">Confetti Effect Demo</h1>
                <p className="text-gray-300 text-center">Controls available in the sidebar</p>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ConfettiEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playing: Story = {
    args: {
        showConfetti: true,
        shouldAnimate: true,
    },
};

export const AnimationDisabled: Story = {
    args: {
        showConfetti: true,
        shouldAnimate: false,
    },
};

export const Hidden: Story = {
    args: {
        showConfetti: false,
        shouldAnimate: true,
    },
};
