import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import LoadingWrapper from "../components/loadingwrapper"; // bungkus client
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
      <body className={inter.className}>
        <LoadingWrapper>
          <Navbar enableScrollEffect={true} />
          <main className="pt-16">{children}</main>
          <footer className="py-6 bg-gray-900 text-gray-400 text-center mt-20">
            <p>© 2025 Nizam Mikhalfani</p>
          </footer>
        </LoadingWrapper>
      </body>
    </html>
  );
}
