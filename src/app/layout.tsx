import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
