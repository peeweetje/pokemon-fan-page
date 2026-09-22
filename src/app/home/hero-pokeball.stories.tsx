import type { Meta, StoryObj } from '@storybook/react';
import HeroPokeball from './hero-pokeball';

const meta: Meta<typeof HeroPokeball> = {
  title: 'Home/Hero Pokeball',
  component: HeroPokeball,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    spinDuration: {
      control: { type: 'range', min: 1, max: 12, step: 0.5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroPokeball>;

export const Large: Story = {
  args: {
    size: 'lg',
    spinDuration: 4,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    spinDuration: 4,
  },
};

export const SlowSpin: Story = {
  args: {
    size: 'lg',
    spinDuration: 10,
  },
};

export const FastSpin: Story = {
  args: {
    size: 'lg',
    spinDuration: 1.5,
  },
};
