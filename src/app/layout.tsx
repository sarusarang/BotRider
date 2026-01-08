import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


// Metadata
export const metadata: Metadata = {

  title: {
    default: "Boat Rider",
    template: "%s | Boat Rider"
  },

  description: "Boat Rider is a premium cycling store for high-performance bikes, accessories, and riding gear.",

  metadataBase: new URL("https://boatrider.com"),

  openGraph: {
    title: "Boat Rider — Premium Cycling Store",
    description:
      "Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    url: "https://boatrider.com",
    siteName: "Boat Rider",
    images: "/logo.png",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Boat Rider — Premium Cycling Store",
    description:
      "Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    images: "/logo.png",
  },

  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className="antialiased"
      >

        <div className="flex flex-col min-h-screen">

          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />

        </div>

      </body>
    </html>
  );
}
