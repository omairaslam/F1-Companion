import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { DevelopmentBanner } from "@/components/ui/DevelopmentBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "F1 Companion - Your Ultimate Formula 1 Experience",
  description: "Stay up-to-date with Formula 1 races, drivers, teams, news, and more. Your comprehensive F1 companion app.",
  keywords: ["Formula 1", "F1", "Racing", "Motorsport", "Grand Prix", "Drivers", "Teams"],
  authors: [{ name: "F1 Companion Team" }],
  creator: "F1 Companion",
  publisher: "F1 Companion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "F1 Companion - Your Ultimate Formula 1 Experience",
    description: "Stay up-to-date with Formula 1 races, drivers, teams, news, and more.",
    url: "/",
    siteName: "F1 Companion",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "F1 Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "F1 Companion - Your Ultimate Formula 1 Experience",
    description: "Stay up-to-date with Formula 1 races, drivers, teams, news, and more.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e10600" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <div id="root">
          <DevelopmentBanner />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
