import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import CTASection from './cta-section';

const meta: Meta<typeof CTASection> = {
  title: 'Home/CTA Section',
  component: CTASection,
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
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {};
