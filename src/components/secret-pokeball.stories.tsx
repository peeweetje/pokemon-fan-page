import type { Meta, StoryObj } from '@storybook/react';
import SecretPokeball from './secret-pokeball';

const meta: Meta<typeof SecretPokeball> = {
    title: 'Components/Secret Pokeball',
    component: SecretPokeball,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SecretPokeball>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
                <p className="p-4">The secret pokeball appears randomly. Wait for it or check the code logic.</p>
                <Story />
            </div>
        ),
    ],
};
