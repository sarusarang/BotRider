import CategorySlider from "@/components/home/CategorySlider";
import VideoShowcase from "@/components/home/VideoShowcase";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import ImmersiveFeatures from "@/components/home/ImmersiveFeatures";
import { BlurFade } from "@/components/ui/blur-fade";
import type { Metadata } from "next";



export const metadata: Metadata = {

  title: "Boat Rider",
  description: "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider. Premium cycling gear built for speed and adventure.",

  openGraph: {
    title: "Boat Rider — High Performance Cycling Store",
    description: "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider.",
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
    description: "Buy road bikes, mountain bikes, e-bikes & accessories at Boat Rider.",
    images: ["https://bot-rider.vercel.app/logo.png"],
  },

};



export default function Home() {


  return (


    <section aria-label="Homepage" className="w-full flex-col items-center justify-center">



      {/* Video Showcase */}
      <VideoShowcase />


      {/* Category Slider */}
      <CategorySlider />


      {/* Featured Collection */}
      <BlurFade delay={0.25 * 2} duration={0.5} inView>
        <FeaturedCollection />
      </BlurFade>


      {/* Immersive Features */}
      <BlurFade delay={0.25 * 3} duration={0.5} inView>
        <ImmersiveFeatures />
      </BlurFade>


    </section >



  );



}
