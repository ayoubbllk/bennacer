/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 SHOWS PAGE - All tour dates
 * ═══════════════════════════════════════════════════════════════
 */

import { Metadata } from 'next';
import { ShowsHero } from '@/components/shows/ShowsHero';
import { ShowsList } from '@/components/shows/ShowsList';
import { ShowExperience } from '@/components/shows/ShowExperience';
import { Venues } from '@/components/shows/Venues';
import { Newsletter } from '@/components/shows/Newsletter';
import { getAllShows } from '@/lib/shows-data';

export const metadata: Metadata = {
  title: 'Spectacles & Dates | Mouaadh Bennacer',
  description: 'Retrouvez toutes les dates de la tournée de Mouaadh Bennacer. Réservez vos places pour ses prochains spectacles de stand-up comedy.',
};

export const dynamic = 'force-dynamic';

export default function ShowsPage() {
  const shows = getAllShows();

  return (
    <main className="min-h-screen">
      <ShowsHero />
      <ShowsList shows={shows} />
      <ShowExperience />
      <Venues />
      <Newsletter />
    </main>
  );
}
