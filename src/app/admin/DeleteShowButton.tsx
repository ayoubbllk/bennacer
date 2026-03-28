'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteShowButton({ showId, showName }: { showId: string; showName: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/shows/${showId}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-400 mr-1">Supprimer {showName} ?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          {loading ? '...' : 'Oui'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
    >
      Supprimer
    </button>
  );
}
