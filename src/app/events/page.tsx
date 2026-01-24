import { Metadata } from 'next';
import EventClient from './EventClient';



// Metadata for events page
export const metadata: Metadata = {

    title: "Events",
    description: "Events for bike riders and enthusiasts in India ",

    openGraph: {
        title: "Events",
        description: "Events for bike riders and enthusiasts in India",
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
        title: "Events",
        description: "",
        images: ["https://bot-rider.vercel.app/logo.png"],
    },

};


export default function EventsPage() {

    return <EventClient />;

}


