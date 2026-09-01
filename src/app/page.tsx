'use client';

import { useRouter } from 'next/navigation';
import HeroSection from '@/app/home/hero-section';
import CardSections from '@/app/home/card-sections';
import { getFeatureCards } from '@/app/home/feature-cards';
import CTASection from '@/app/home/cta-section';
import FooterSection from '@/app/home/footer-section';

export default function Home() {
  const router = useRouter();
  const featureCards = getFeatureCards();

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-500 to-red-600 text-white">
      <HeroSection onNavigate={handleNavigate} />
      <CardSections title="Explore the Pokémon World" cards={featureCards} />
      <CTASection onNavigate={handleNavigate} />
      <FooterSection />
    </div>
  );
}
