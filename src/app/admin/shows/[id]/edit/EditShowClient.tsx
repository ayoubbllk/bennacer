'use client';

import { ShowForm } from '../../ShowForm';
import type { Show } from '@/lib/shows-types';

export function EditShowClient({ show }: { show: Show }) {
  return <ShowForm show={show} mode="edit" />;
}
