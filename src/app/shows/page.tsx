/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 SHOWS PAGE - All tour dates
 * ═══════════════════════════════════════════════════════════════
 */

import { Metadata } from 'next';
import { ShowsHero } from '@/components/shows/ShowsHero';
import { ShowsList } from '@/components/shows/ShowsList';
import { Newsletter } from '@/components/shows/Newsletter';

export const metadata: Metadata = {
  title: 'Spectacles & Dates | Mouaadh Bennacer',
  description: 'Retrouvez toutes les dates de la tournée de Mouaadh Bennacer. Réservez vos places pour ses prochains spectacles de stand-up comedy.',
};

export default function ShowsPage() {
  return (
    <main className="min-h-screen">
      <ShowsHero />
      <ShowsList />
      <Newsletter />
    </main>
  );
}
