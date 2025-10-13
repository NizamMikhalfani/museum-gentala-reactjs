import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Protect admin routes with authentication
  const session = await requireAdmin();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
