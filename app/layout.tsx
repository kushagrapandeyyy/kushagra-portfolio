import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Kushagra Pandey — Software Engineer";
const description = "Kushagra Pandey builds backend services, intelligent software systems, and full-stack products with a focus on security, performance, and production delivery.";
const deploymentUrl = process.env.PORTFOLIO_URL;

export const metadata: Metadata = {
  ...(deploymentUrl && { metadataBase: new URL(deploymentUrl), alternates: { canonical: "/" } }),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
