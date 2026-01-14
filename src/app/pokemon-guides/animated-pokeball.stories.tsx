import type { Meta, StoryObj } from '@storybook/react';
import AnimatedPokeball from './animated-pokeball';

const meta = {
    title: 'Pokemon Guides/Animated Pokeball',
    component: AnimatedPokeball,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        animationType: {
            control: 'select',
            options: ['rotate', 'float', 'scale', 'combined', 'rotate-scale'],
        },
    },
} satisfies Meta<typeof AnimatedPokeball>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediumRotate: Story = {
    args: {
        size: 'medium',
        animationType: 'rotate',
    },
};

export const SmallFloat: Story = {
    args: {
        size: 'small',
        animationType: 'float',
    },
};

export const LargeScale: Story = {
    args: {
        size: 'large',
        animationType: 'scale',
    },
};

export const CombinedAnimation: Story = {
    args: {
        size: 'medium',
        animationType: 'combined',
    },
};

export const RotateScale: Story = {
    args: {
        size: 'medium',
        animationType: 'rotate-scale',
    },
};
