import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout";
import LoadingWrapper from "@/components/LoadingWrapper";
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
          <AppLayout>{children}</AppLayout>
        </LoadingWrapper>
      </body>
    </html>
  );
}
