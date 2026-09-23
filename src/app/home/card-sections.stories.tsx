import type { Meta, StoryObj } from '@storybook/react';
import CardSections from './card-sections';
import { getFeatureCards } from './feature-cards';

const meta: Meta<typeof CardSections> = {
  title: 'Home/Card Sections',
  component: CardSections,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text' },
    cards: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof CardSections>;

export const Default: Story = {
  args: {
    title: 'Explore the Pokémon World',
    cards: getFeatureCards(),
  },
};

export const SingleCard: Story = {
  args: {
    title: 'Featured',
    cards: getFeatureCards().slice(0, 1),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Start Your Journey',
    cards: getFeatureCards().slice(0, 3),
  },
};
