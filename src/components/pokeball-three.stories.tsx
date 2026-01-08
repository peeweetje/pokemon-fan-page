import type { Meta, StoryObj } from '@storybook/react';
import PokeballThree from './pokeball-three';

const meta: Meta<typeof PokeballThree> = {
    title: 'Components/PokeballThree',
    component: PokeballThree,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokeballThree>;

export const Default: Story = {
    render: () => (
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
            <PokeballThree />
        </div>
    ),
};
