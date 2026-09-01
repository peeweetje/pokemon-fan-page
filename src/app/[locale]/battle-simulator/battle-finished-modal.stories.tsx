import type { Meta, StoryObj } from '@storybook/react';
import { BattleFinishedModal } from './battle-finished-modal';

const meta: Meta<typeof BattleFinishedModal> = {
  title: 'Battle Simulator/Battle Finished Modal',
  component: BattleFinishedModal,
  tags: ['autodocs'],
  argTypes: {
    isVisible: { control: 'boolean' },
    battleResult: { control: 'select', options: ['win', 'loss', null] },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <div style={{ padding: '20px', border: '1px dashed #ccc', marginBottom: '10px' }}>
          <h1>Battle Simulator</h1>
          <p>Battle in progress...</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BattleFinishedModal>;

export const Win: Story = {
  args: {
    isVisible: true,
    battleResult: 'win',
    onClose: () => console.log('Close'),
    onReset: () => console.log('Reset'),
    battleId: 1,
    currentBattleId: 1,
  },
};

export const Loss: Story = {
  args: {
    isVisible: true,
    battleResult: 'loss',
    onClose: () => console.log('Close'),
    onReset: () => console.log('Reset'),
    battleId: 1,
    currentBattleId: 1,
  },
};


