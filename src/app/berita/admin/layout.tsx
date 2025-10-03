export const dynamic = 'force-dynamic';

export default function AdminNewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      {children}
    </div>
  );
}
