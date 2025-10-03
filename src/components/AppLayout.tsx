'use client';

import { usePathname } from 'next/navigation';
import NavShell from "@/components/NavShell";
import Footer from "@/components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') ?? false;

  return (
    <>
      {!isAdminPage && <NavShell />}
      <main className={`flex-grow ${!isAdminPage ? 'pt-16' : ''}`}>{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
}
