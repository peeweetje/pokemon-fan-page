import type { Meta, StoryObj } from '@storybook/react';
import QuickTips from './quick-tips';

const meta = {
    title: 'Pokemon Guides/Quick Tips',
    component: QuickTips,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="w-[400px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof QuickTips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
