/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 MOUAADH BENNACER - HOMEPAGE
 * ═══════════════════════════════════════════════════════════════
 */

import { Hero } from '@/components/sections/Hero';
import { UpcomingShows } from '@/components/sections/UpcomingShows';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <UpcomingShows />
      <AboutPreview />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
