import Link from 'next/link';
import { getAllShows, statusConfig } from '@/lib/shows-data';
import { DeleteShowButton } from './DeleteShowButton';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const shows = getAllShows();

  const stats = {
    total: shows.length,
    available: shows.filter(s => s.status === 'available').length,
    fewLeft: shows.filter(s => s.status === 'few-left').length,
    soldOut: shows.filter(s => s.status === 'sold-out').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Spectacles</h1>
          <p className="text-gray-400 mt-1">Gérez vos dates de tournée</p>
        </div>
        <Link
          href="/admin/shows/new"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors"
        >
          + Nouveau spectacle
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} color="text-white" />
        <StatCard label="Disponibles" value={stats.available} color="text-green-400" />
        <StatCard label="Dernières places" value={stats.fewLeft} color="text-orange-400" />
        <StatCard label="Complets" value={stats.soldOut} color="text-red-400" />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Image</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Salle</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Ville</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Statut</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Prix</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => {
                const status = statusConfig[show.status];
                return (
                  <tr key={show.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <div
                        className="w-16 h-12 rounded-lg bg-cover bg-center bg-gray-800"
                        style={{ backgroundImage: show.image ? `url('${show.image}')` : undefined }}
                      />
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {show.date} {show.month} {show.year}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{show.venue}</td>
                    <td className="px-6 py-4 text-gray-300">{show.city}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}/20 ${status.textColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{show.price}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/shows/${show.id}/edit`}
                          className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                        >
                          Modifier
                        </Link>
                        <DeleteShowButton showId={show.id} showName={show.venue} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {shows.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Aucun spectacle</p>
            <p className="text-sm mt-1">Créez votre premier spectacle pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
