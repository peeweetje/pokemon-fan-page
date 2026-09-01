import type { Meta, StoryObj } from '@storybook/react';
import GuideContentCard from './guide-content-card';

const meta = {
    title: 'Pokemon Guides/Content Card',
    component: GuideContentCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        activeSection: {
            control: 'select',
            options: ['tips', 'walkthroughs', 'training', 'competitive', 'other'],
        },
    },
    decorators: [
        (Story) => (
            <div className="w-[400px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof GuideContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tips: Story = {
    args: {
        title: 'Top 5 Tips for Beginners',
        content: 'Start your journey with these essential tips to become a Pokemon Master.',
        activeSection: 'tips',
        index: 0,
    },
};

export const Walkthroughs: Story = {
    args: {
        title: 'Route 1 Walkthrough',
        content: 'Navigate through the first route and catch your first Pokemon.',
        activeSection: 'walkthroughs',
        index: 1,
    },
};

export const Training: Story = {
    args: {
        title: 'EV Training Guide',
        content: 'Learn how to maximize your Pokemon stats through EV training.',
        activeSection: 'training',
        index: 2,
    },
};

export const Competitive: Story = {
    args: {
        title: 'Meta Analysis',
        content: 'Understanding the current competitive meta and team building strategies.',
        activeSection: 'competitive',
        index: 3,
    },
};
