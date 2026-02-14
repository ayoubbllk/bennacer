/**
 * ═══════════════════════════════════════════════════════════════
 * 👤 À PROPOS PAGE - Artist storytelling
 * ═══════════════════════════════════════════════════════════════
 */

import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { Timeline } from '@/components/about/Timeline';
import { Values } from '@/components/about/Values';
import { Press } from '@/components/about/Press';

export const metadata: Metadata = {
  title: 'À Propos | Mouaadh Bennacer',
  description: 'Découvrez le parcours de Mouaadh Bennacer, humoriste passionné depuis plus de 10 ans. Son histoire, ses valeurs, son univers.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <Timeline />
      <Values />
      <Press />
    </main>
  );
}
