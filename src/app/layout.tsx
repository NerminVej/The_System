import type { Metadata } from "next";
import { Inter, Rajdhani, Orbitron, Roboto_Mono } from "next/font/google";
import { MainLayout } from "@/components/layout/MainLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-rajdhani'
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron'
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--font-roboto-mono'
});

export const metadata: Metadata = {
  title: "The System - Solo Leveling Self-Improvement",
  description: "A Solo Leveling-inspired self-improvement tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${rajdhani.variable} ${orbitron.variable} ${robotoMono.variable} font-sans`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
