import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import CTALinkButton from './cta-button';

const meta: Meta<typeof CTALinkButton> = {
  title: 'Home/CTA Button',
  component: CTALinkButton,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'default', 'icon'],
    },
    onNavigate: { action: 'navigated' },
  },
  args: {
    onNavigate: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof CTALinkButton>;

export const Default: Story = {
  args: {
    href: '/pokedex',
    label: 'View Pokédex',
  },
};

export const PlayMemory: Story = {
  args: {
    href: '/game',
    label: 'Play Memory',
    className:
      'bg-yellow-500 text-black hover:bg-yellow-400 font-bold text-lg px-8 py-6 rounded-full',
  },
};

export const ViewPokedex: Story = {
  args: {
    href: '/pokedex',
    label: 'View Pokédex',
    className:
      'bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full',
  },
};
