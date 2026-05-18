import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ScrollRadar } from "@/components/ui/ScrollRadar";

import "./globals.css";

export const metadata: Metadata = {
  title: "DRODET | Dost Düşman İHA Tespit Portfolyosu",
  description:
    "Savunma sanayi odaklı dost düşman drone tespit projesi için hikâye anlatımlı modern portfolyo sitesi.",
  applicationName: "DRODET"
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="tr">
      <body className="site-shell">
        <ScrollRadar />
        {children}
      </body>
    </html>
  );
}
