import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Kushagra Pandey — Software Engineer",
    template: "%s | Kushagra Pandey",
  },
  description:
    "Kushagra Pandey is a software engineer focused on backend systems, full-stack products, application security and applied AI.",
  openGraph: {
    title: "Kushagra Pandey — Software Engineer",
    description:
      "Building reliable systems, useful products and thoughtful software experiences.",
    type: "website",
    images: ["/og-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushagra Pandey — Software Engineer",
    description: "Backend-focused software engineer building products and systems.",
    images: ["/og-cover.svg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
