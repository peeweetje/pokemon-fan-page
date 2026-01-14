import type { Meta, StoryObj } from '@storybook/react';
import PokemonGuidesSidebar from './pokemon-guides-sidebar';
import { BookOpen, Trophy, Zap, Target, Sparkles } from 'lucide-react';


const mockSections = [
    { id: 'tips', title: 'Tips & Tricks', icon: <BookOpen className="w-6 h-6" /> },
    { id: 'walkthroughs', title: 'Walkthroughs', icon: <Target className="w-6 h-6" /> },
    { id: 'training', title: 'Training', icon: <Zap className="w-6 h-6" /> },
    { id: 'competitive', title: 'Competitive', icon: <Trophy className="w-6 h-6" /> },
    { id: 'shiny', title: 'Shiny Hunting', icon: <Sparkles className="w-6 h-6" /> },
];

const meta = {
    title: 'Pokemon Guides/Sidebar',
    component: PokemonGuidesSidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        sections: mockSections,
        activeSection: 'tips',
        setActiveSection: () => { },
        isMobileMenuOpen: false,
        setIsMobileMenuOpen: () => { },
        setIsNavigating: () => { },
        children: (
            <div className="p-4">
                <h2 className="text-2xl font-bold">Default Content</h2>
                <p>This is a placeholder content area.</p>
            </div>
        ),
    },
} satisfies Meta<typeof PokemonGuidesSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ children, ...args }) => (
        <PokemonGuidesSidebar {...args}>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Content for {args.activeSection}</h2>
                <p className="mt-4 text-gray-600">
                    This is a placeholder content area to demonstrate the layout.
                </p>
            </div>
        </PokemonGuidesSidebar>
    ),
};

export const MobileMenuOpen: Story = {
    render: ({ children, ...args }) => (
        <PokemonGuidesSidebar {...args}>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Content with Mobile Menu Open</h2>
            </div>
        </PokemonGuidesSidebar>
    ),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    args: {
        isMobileMenuOpen: true,
    },
};

export const CompetitiveSectionActive: Story = {
    render: ({ children, ...args }) => (
        <PokemonGuidesSidebar {...args}>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Competitive Section Content</h2>
            </div>
        </PokemonGuidesSidebar>
    ),
    args: {
        activeSection: 'competitive',
    },
};
