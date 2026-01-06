import type { Meta, StoryObj } from '@storybook/react';
import BackButton from './back-button';

const meta: Meta<typeof BackButton> = {
    title: 'Components/BackButton',
    component: BackButton,
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
        },
        href: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
    args: {
        href: '/pokedex',
        text: 'Back to Pokédex',
    },
};

export const Minimal: Story = {
    args: {
        href: '/',
        text: 'Back',
    },
};
