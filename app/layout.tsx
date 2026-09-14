import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AETHEL OCEANIA | Silence at 6,000 Meters",
  description:
    "A continuous-flow electric submersible engineered for zero-acoustic presence, crystalline panoramic observation, and enduring calm in Earth's final frontier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/urz2jtb.css" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
