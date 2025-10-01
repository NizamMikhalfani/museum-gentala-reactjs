import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavShell from "@/components/NavShell";
import Footer from "@/components/Footer";
import LoadingWrapper from "../components/LoadingWrapper"; // bungkus client
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerbang Gentala",
  description: "Website Museum Menara Gentala Arasy",
  icons: {
    icon: "/logo/Menara.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <LoadingWrapper>
          <NavShell />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
