import type { Meta, StoryObj } from '@storybook/react';
import FloatingParticles from './floating-particles';

const meta = {
    title: 'Pokemon Guides/FloatingParticles',
    component: FloatingParticles,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        count: { control: 'number' },
        animationDuration: { control: 'number' },
        delayMultiplier: { control: 'number' },
    },
    decorators: [
        (Story) => (
            <div className="w-64 h-64 bg-slate-900 relative overflow-hidden rounded-lg border border-slate-700">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof FloatingParticles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        count: 3,
    },
};

export const ManyParticles: Story = {
    args: {
        count: 10,
        animationDuration: 2,
        delayMultiplier: 0.2,
    },
};

export const CustomStyle: Story = {
    args: {
        count: 5,
        particleClassName: 'absolute w-3 h-3 rounded-md bg-yellow-400 opacity-50',
    },
};
