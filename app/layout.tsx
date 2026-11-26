import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { portfolioUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = { metadataBase: portfolioUrl };

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
