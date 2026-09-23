import type { Meta, StoryObj } from '@storybook/react';
import BackgroundPokeballs from './background-pokeballs';

const meta: Meta<typeof BackgroundPokeballs> = {
  title: 'Home/Background Pokeballs',
  component: BackgroundPokeballs,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          background: 'linear-gradient(to bottom right, #ef4444, #dc2626)',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BackgroundPokeballs>;

export const Default: Story = {};
