
import { Metadata } from "next";
import ContactClient from "./ContactClient";




export const metadata: Metadata = {

  title: "Contact Us | Boat Rider",
  description: "Get in touch with us for any inquiries or questions.",

  openGraph: {
    title: "Contact Us | Boat Rider",
    description: "Get in touch with us for any inquiries or questions.",
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
    title: "Contact Us | Boat Rider",
    description: "Get in touch with us for any inquiries or questions.",
    images: ["https://bot-rider.vercel.app/logo.png"],
  },

};


export default function ContactPage() {

    return (
      
      <ContactClient />

    );

}

