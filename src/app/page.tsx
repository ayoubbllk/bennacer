/**
 * ═══════════════════════════════════════════════════════════════
 * 🎭 MOUAADH BENNACER - HOMEPAGE
 * ═══════════════════════════════════════════════════════════════
 */

import { Hero } from '@/components/sections/Hero';
import { StatsMarquee } from '@/components/sections/StatsMarquee';
import { UpcomingShows } from '@/components/sections/UpcomingShows';
import { VideoReel } from '@/components/sections/VideoReel';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { BehindTheScenes } from '@/components/sections/BehindTheScenes';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsMarquee />
      <UpcomingShows />
      <VideoReel />
      <AboutPreview />
      <BehindTheScenes />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
