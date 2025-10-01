"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavShell() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  return <Navbar enableScrollEffect={true} isLandingPage={isLanding} />;
}
