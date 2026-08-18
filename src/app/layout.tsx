import type { Metadata } from "next";
import { Inter, Tinos } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const tinos = Tinos({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JanaRaksha",
  description:
    "Emergency Complaint & Response Platform for reporting incidents, tracking complaints, and accessing safety tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${tinos.variable}`}>
        {children}
      </body>
    </html>
  );
}