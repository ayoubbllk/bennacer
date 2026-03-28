/**
 * ═══════════════════════════════════════════════════════════════
 * 🎫 SHOWS DATA - Server-only: reads shows from SQLite database
 * ═══════════════════════════════════════════════════════════════
 */

import 'server-only';
import db from './db';
import type { Show } from './shows-types';

export type { Show };
export { statusConfig } from './shows-types';

export function getAllShows(): Show[] {
  return db.prepare('SELECT * FROM shows ORDER BY year, date').all() as Show[];
}

export function getShowById(id: string): Show | undefined {
  return db.prepare('SELECT * FROM shows WHERE id = ?').get(id) as Show | undefined;
}
