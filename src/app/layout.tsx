import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Academix — Premium Learning Dashboard",
  description:
    "A next-gen learning platform with real-time progress tracking, curated courses, and a premium learning experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-white`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0 px-4 py-6 md:px-6 lg:px-8 pb-24 md:pb-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
