import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transformasi di Balik Demam Nikel Sulawesi Tengah",
  description:
    "Sebuah data storytelling interaktif tentang transformasi ekonomi Sulawesi Tengah di tengah hilirisasi nikel — pertumbuhan, konsentrasi, dan kesejahteraan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="h-full bg-navy text-cream antialiased">{children}</body>
    </html>
  );
}
