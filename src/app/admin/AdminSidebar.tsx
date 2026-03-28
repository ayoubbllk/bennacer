'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/shows/new', label: 'Nouveau spectacle', icon: '➕' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold text-white">
          Admin Panel
        </Link>
        <p className="text-sm text-gray-400 mt-1">Gestion des spectacles</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-orange-500/10 text-orange-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span>{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}

        <hr className="border-gray-800 my-4" />

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <span>🌐</span>
          <span className="font-medium">Voir le site</span>
        </Link>
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">{username}</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition-colors text-sm"
            title="Déconnexion"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
