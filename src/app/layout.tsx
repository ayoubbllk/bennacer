import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mouaadh Bennacer | Stand-Up Comedy",
  description: "Découvrez l'univers de Mouaadh Bennacer - Humoriste et artiste de stand-up comedy. Spectacles, dates de tournée et réservations.",
  keywords: ["stand-up", "comedy", "humour", "spectacle", "Mouaadh Bennacer", "humoriste"],
  authors: [{ name: "Mouaadh Bennacer" }],
  openGraph: {
    title: "Mouaadh Bennacer | Stand-Up Comedy",
    description: "Découvrez l'univers de Mouaadh Bennacer - Humoriste et artiste de stand-up comedy.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouaadh Bennacer | Stand-Up Comedy",
    description: "Découvrez l'univers de Mouaadh Bennacer - Humoriste et artiste de stand-up comedy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-body antialiased bg-scene-black text-cream`}
      >
        <Header />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
