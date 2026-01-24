import type { Metadata } from "next";
import AboutClient from "./AboutClient";



export const metadata: Metadata = {

  title: "About Us",

  description: "Boat Rider has been delivering premium bicycles, expert service, and a passionate cycling community since 1974. Discover our mission, team, and values.",

  keywords: [
    "Boat Rider",
    "premium bikes",
    "bicycle shop",
    "cycling community",
    "bike service",
    "road bikes",
    "mountain bikes",
    "electric bikes",
  ],

  authors: [{ name: "Boat Rider" }],
  creator: "Boat Rider",
  publisher: "Boat Rider",

  openGraph: {
    title: "About Us",
    description: "More than a bike shop. Premium brands, expert mechanics, and a cycling community built on passion and performance.",
    url: "https://bot-rider.vercel.app/logo.png",
    siteName: "Boat Rider",
    images: [
      {
        url: "https://bot-rider.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Boat Rider cycling community",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description: "Premium bikes, expert service, and a passionate cycling community since 1974.",
    images: [
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://bot-rider.vercel.app/about",
  },
  
};



export default function Page() {
  return <AboutClient />;
}
