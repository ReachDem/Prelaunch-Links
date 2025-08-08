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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RCDM Ink - Aperçu",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RCDM Ink - Prelaunch",
    description: "Découvrez RCDM Ink - Solution innovante en prélancement",
    images: ["/og-image.png"],
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
