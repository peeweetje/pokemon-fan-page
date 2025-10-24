'use client';

import { useRouter } from 'next/navigation';
import HeroSection from './home/hero-section';
import CardSections from './home/card-sections';
import { featureCards } from './home/feature-cards';
import CTASection from './home/cta-section';
import FooterSection from './home/footer-section';

export default function Home() {
  const router = useRouter();

  // Helper for navigation
  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 text-white">
      <HeroSection onNavigate={handleNavigate} />
      <CardSections title="Explore the Pokémon World" cards={featureCards} />
      <CTASection onNavigate={handleNavigate} />
      <FooterSection />
    </div>
  );
}
