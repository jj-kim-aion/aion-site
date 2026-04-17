import type {Metadata} from "next";
import "./globals.css";
import {Navigation} from "@/components/Navigation";
import {Footer} from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aion Labs — Autonomous Intelligence. Engineered.",
  description:
    "We build AI super-agents that run businesses. Three autonomous agents. One unified system. Zero busywork.",
  openGraph: {
    title: "Aion Labs — Autonomous Intelligence. Engineered.",
    description:
      "We build AI super-agents that run businesses. Three autonomous agents. One unified system. Zero busywork.",
    type: "website",
  },
  icons: {
    icon: [
      {url: "/icon.svg", type: "image/svg+xml"},
      {url: "/favicon.ico", sizes: "any"},
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-bone grain-overlay arch-grid min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
