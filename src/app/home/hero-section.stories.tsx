import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import HeroSection from './hero-section';

const meta: Meta<typeof HeroSection> = {
  title: 'Home/Hero Section',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onNavigate: { action: 'navigated' },
  },
  args: {
    onNavigate: fn(),
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 text-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {};
