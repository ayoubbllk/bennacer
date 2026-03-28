import { getSession } from '@/lib/auth';
import { AdminSidebar } from './AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // If not authenticated, render children without sidebar (login page)
  // The middleware handles the actual redirect for protected routes
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar username={session.username} />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
