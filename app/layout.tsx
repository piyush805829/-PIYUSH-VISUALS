import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piyushvisuals.vercel.app"),
  title: "PIYUSH VISUALS — Creative Video Editor & Visual Storyteller",
  description:
    "Crafting visuals. Creating impact. Independent video editor specializing in cinematic commercials, high-retention short-form content, architecture tours, and brand narratives.",
  keywords: [
    "Piyush Visuals",
    "Video Editor",
    "Cinematic Video Editing",
    "Commercial Video Editor",
    "Short form video editor",
    "DaVinci Resolve Colorist",
    "Premiere Pro Editor",
    "Creative Director",
    "Post-production India",
  ],
  authors: [{ name: "Piyush Visuals" }],
  creator: "Piyush Visuals",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piyushvisuals.vercel.app",
    title: "PIYUSH VISUALS — Crafting Visuals. Creating Impact.",
    description:
      "Independent video editor and visual storyteller crafting cinematic experiences, engaging content, and powerful brand visuals.",
    siteName: "PIYUSH VISUALS",
    images: [
      {
        url: "/thumbnails/projects/00_my_intro.webp",
        width: 1200,
        height: 630,
        alt: "Piyush Visuals Showreel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PIYUSH VISUALS — Crafting Visuals. Creating Impact.",
    description:
      "Independent video editor and visual storyteller crafting cinematic experiences, engaging content, and powerful brand visuals.",
    images: ["/thumbnails/projects/00_my_intro.webp"],
    creator: "@piyushvisualss",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#080808] text-white selection:bg-[#D6FF48] selection:text-black font-sans`}>
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
