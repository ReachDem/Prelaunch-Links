import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RCDM Ink - Prelaunch",
  description: "Découvrez RCDM Ink - Solution innovante en prélancement",
  openGraph: {
    title: "RCDM Ink - Prelaunch",
    description: "Découvrez RCDM Ink - Solution innovante en prélancement",
    type: "website",
    locale: "fr_FR",
    siteName: "RCDM Ink",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCDM Ink - Prelaunch",
    description: "Découvrez RCDM Ink - Solution innovante en prélancement",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
