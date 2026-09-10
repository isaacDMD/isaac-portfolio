import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Djimadjo — Full-Stack Developer",
  description:
    "Full-Stack Developer based in Lomé, Togo. I build web applications, interactive experiences and backend systems.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Python",
    "FastAPI",
    "Django",
    "Lomé",
    "Togo",
  ],
  authors: [{ name: "Isaac Djimadjo" }],
  openGraph: {
    title: "Isaac Djimadjo — Full-Stack Developer",
    description: "Full-Stack Developer based in Lomé, Togo.",
    type: "website",
    locale: "en_US",
    url: "https://isaacdjimadjo.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Djimadjo — Full-Stack Developer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
