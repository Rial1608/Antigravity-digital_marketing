'use client';

import { useEffect } from 'react';
import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import ProductShowcase from '@/components/ProductShowcase';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="bg-[#1A0F0A] min-h-screen">
      {/* Hero: Scroll-Triggered Canvas Animation */}
      <HeroCanvasAnimation />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Feature Highlights Section */}
      <FeatureSection />

      {/* Final Call-to-Action */}
      <FinalCTA />
    </main>
  );
}
