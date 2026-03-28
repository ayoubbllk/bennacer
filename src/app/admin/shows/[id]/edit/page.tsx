import { notFound } from 'next/navigation';
import { getShowById } from '@/lib/shows-data';
import { EditShowClient } from './EditShowClient';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditShowPage({ params }: Props) {
  const { id } = await params;
  const show = getShowById(id);

  if (!show) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Modifier le spectacle</h1>
        <p className="text-gray-400 mt-1">{show.venue} — {show.city}</p>
      </div>
      <EditShowClient show={show} />
    </div>
  );
}
