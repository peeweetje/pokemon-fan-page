import type { Meta, StoryObj } from '@storybook/react';
import { SoundToggle } from './sound-toggle';


const meta = {
    title: 'Components/Pokemon Memory Game/Sound Toggle',
    component: SoundToggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onToggle: () => { },
    },
} satisfies Meta<typeof SoundToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SoundOn: Story = {
    args: {
        soundEnabled: true,
    },
};

export const SoundOff: Story = {
    args: {
        soundEnabled: false,
    },
};
