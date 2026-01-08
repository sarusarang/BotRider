import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


export const metadata: Metadata = {
  
  metadataBase: new URL("https://bot-rider.vercel.app"),

  title: {
    default: "Boat Rider",
    template: "%s | Boat Rider",
  },

  description:"Boat Rider is a premium cycling store for high-performance bikes, accessories, and riding gear.",

  openGraph: {
    title: "Boat Rider — Premium Cycling Store",
    description:"Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    url: "https://bot-rider.vercel.app",
    siteName: "Boat Rider",
    images: [
      {
        url: "https://bot-rider.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Boat Rider",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Boat Rider — Premium Cycling Store",
    description:"Shop premium road, mountain & electric bikes along with accessories at Boat Rider.",
    images: ["https://bot-rider.vercel.app/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
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
