import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";
import LoadingWrapper from "@/components/loadingwrapper";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col">
        <LoadingWrapper>
          <AppLayout>{children}</AppLayout>
        </LoadingWrapper>
      </body>
    </html>
  );
}
