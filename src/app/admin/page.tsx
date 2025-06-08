import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>
          <AdminPanel />
        </div>
      </div>
    </main>
  );
} 