import HeroSlider from "@/components/home/HeroSlider";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Boat Rider",
  description:
    "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider. Premium cycling gear built for speed and adventure.",

  openGraph: {
    title: "Boat Rider — High Performance Cycling Store",
    description:
      "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider.",
    images: [
      {
        url: "https://bot-rider.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Boat Rider",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Boat Rider — High Performance Cycling Store",
    description:
      "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider.",
    images: ["https://bot-rider.vercel.app/logo.png"],
  },
};



export default function Home() {


  return (


    <section aria-label="Homepage" className="w-full flex-col items-center justify-center">


      {/* Hero Slider */}
      <div className="w-full h-full">
        <HeroSlider />
      </div>



    </section>



  );



}
