import { Metadata } from "next";
import { EventCategories } from "@/components/event-details";

const title = "Event Details";
const description =
    "Explore all Developer's Day 2026 event details, including itinerary, mini-games, food fest, and job fair.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/event-details",
    },
    openGraph: {
        title,
        description,
        url: "/event-details",
        images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 Event Details" }],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/logo-1.png"],
    },
};

export default function EventDetailsPage() {
    return <EventCategories />;
}
