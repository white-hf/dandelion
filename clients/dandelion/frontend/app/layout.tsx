import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dandelion Growth Systems | Local SMB Growth Loops",
  description:
    "Websites, booking, quotes, reviews, and follow-up systems for local service businesses.",
  openGraph: {
    title: "Dandelion Growth Systems",
    description:
      "More practical than a template. Lighter than enterprise software.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
