/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 SHOWS TYPES - Shared types & config (safe for client & server)
 * ═══════════════════════════════════════════════════════════════
 */

export interface Show {
  id: string;
  date: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  status: 'available' | 'few-left' | 'sold-out';
  ticketUrl: string;
  time: string;
  address: string;
  description: string;
  duration: string;
  price: string;
}

export const statusConfig = {
  'available': { label: 'Disponible', color: 'bg-green-500', textColor: 'text-green-400' },
  'few-left': { label: 'Dernières places', color: 'bg-orange-500', textColor: 'text-orange-400' },
  'sold-out': { label: 'Complet', color: 'bg-red-500', textColor: 'text-red-400' },
};
