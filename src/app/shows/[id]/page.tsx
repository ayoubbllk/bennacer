/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 SINGLE SHOW PAGE - Individual show detail
 * ═══════════════════════════════════════════════════════════════
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllShows, getShowById } from '@/lib/shows-data';
import { ShowDetailHero } from '@/components/shows/ShowDetailHero';
import { ShowInfo } from '@/components/shows/ShowInfo';
import { RelatedShows } from '@/components/shows/RelatedShows';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const show = getShowById(id);
  if (!show) return { title: 'Spectacle introuvable' };

  return {
    title: `${show.venue}, ${show.city} — ${show.date} ${show.month} ${show.year} | Mouaadh Bennacer`,
    description: show.description,
    openGraph: {
      title: `${show.venue} — Mouaadh Bennacer en spectacle`,
      description: show.description,
      images: [show.image],
    },
  };
}

export default async function ShowDetailPage({ params }: Props) {
  const { id } = await params;
  const show = getShowById(id);

  if (!show) {
    notFound();
  }

  const allShows = getAllShows();

  return (
    <main className="min-h-screen">
      <ShowDetailHero show={show} />
      <ShowInfo show={show} />
      <RelatedShows currentShowId={show.id} shows={allShows} />
    </main>
  );
}
