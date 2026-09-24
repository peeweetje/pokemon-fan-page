import type { Meta, StoryObj } from '@storybook/react';
import FooterSection from './footer-section';

const meta: Meta<typeof FooterSection> = {
  title: 'Home/Footer Section',
  component: FooterSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FooterSection>;

export const Default: Story = {};
