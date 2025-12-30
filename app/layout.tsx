import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasan Semih Aktaş | Full-Stack Developer Portfolio",
  description:
    "Full Stack Developer · React.js · Node.js · React Native - Modern portfolio with macOS design",
  keywords: [
    "hsemihaktas",
    "h semihaktas",
    "h semih aktas",
    "hsemihaktaş",
    "h semihaktaş",
    "h semih aktaş",
    "Hasan Semih Aktaş",
    "Hasan Semih Aktas",
    "hasan semih aktaş",
    "hasan semih aktas",
    "HASAN SEMİH AKTAŞ",
    "HASAN SEMİH AKTAS",
    "H. S. Aktaş",
    "H. S. Aktas",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Mobile App Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Hasan Semih Aktaş" }],
  robots: "index, follow",
  openGraph: {
    title: "Hasan Semih Aktaş | Full-Stack Developer Portfolio",
    description:
      "Full Stack Developer · React.js · Node.js · React Native - Modern portfolio with macOS design",
    url: "https://hsemihaktas.vercel.app",
    siteName: "Hasan Semih Aktaş Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hasan Semih Aktaş - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Semih Aktaş | Full-Stack Developer Portfolio",
    description:
      "Full Stack Developer · React.js · Node.js · React Native - Modern portfolio with macOS design",
    images: ["/og-image.png"],
  },
  other: {
    "google-site-verification": "RIHQYNOqayD5Y5TpWlG4qkDvQzg9eKkZxcPx2z-DD6g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
