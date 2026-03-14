import Image from "next/image";
import ModuleCompetitions from "@/components/competitions/module-competitions";
import { RegistrationBanner } from "@/components/registration";
import ModuleNotFound from "@/components/competitions/module-not-found";

const modules = [
    {
        id: "coding",
        icon: "/icons/coding.svg",
        title: "CODING_COMPETITIONS",
        categoryDescription: [
            "PROVE YOUR WORTH IN THE DIGITAL ARENA. THREE TRACKS. HIGH STAKES. PURE CODE.",
            "SELECT YOUR PROTOCOL AND EXECUTE."
        ],
        color: "#2563EB",
        bgColor: "#000613",
    },
    {
        id: "software-eng",
        icon: "/icons/software.svg",
        title: "SOFTWARE ENG_COMPETITIONS",
        categoryDescription: [
            "SYSTEMS RUN. ARCHITECTURES COLLIDE. LOGIC PREVAILS.",
            "ENGINEER THE CORE AND DOMINATE THE STACK."
        ],
        color: "#7C3AED",
        bgColor: "#060010",
    },
    {
        id: "tech-quest",
        icon: "/icons/tech.svg",
        title: "TECH_QUEST",
        categoryDescription: [
            "CLUES HIDDEN. SYSTEMS LOCKED. SECRETS EVERYWHERE.",
            "DECODE THE SIGNALS AND FIND THE EXIT."
        ],
        color: "#F59E0B",
        bgColor: "#0A0600",

    },
    {
        id: "dev-design",
        icon: "/icons/dev.svg",
        title: "DEV & DESIGN_COMPETITIONS",
        categoryDescription: [
            "BUILD THE PRODUCT. DESIGN THE EXPERIENCE. SHIP THE IDEA.",
            "FROM PIXELS TO PROTOTYPES — CREATE WHAT COMES NEXT."
        ],
        color: "#3AED5B",
        bgColor: "#000902",
    },
    {
        id: "ai-data",
        icon: "/icons/ai.svg",
        title: "AI & DATA SCI._COMPETITIONS",
        categoryDescription: [
            "TRAIN THE MODEL. CRACK THE DATA. OUTSMART THE MACHINE.",
            "AI IS THE WEAPON. INTELLIGENCE IS THE ADVANTAGE."
        ],
        color: "#00F0FF",
        bgColor: "#00080E",
    },
    {
        id: "general",
        icon: "/icons/general.svg",
        title: "GENERAL_COMPETITIONS",
        categoryDescription: [
            "PURE CHAOS. ZERO RULES. MAXIMUM FUN.",
            "GAMES, CHALLENGES, AND MOMENTS YOU WON'T FORGET."
        ],
        color: "#949494",
        bgColor: "#070707",
    },
    {
        id: "electrical-eng",
        icon: "/icons/electrical.svg",
        title: "ELECTRICAL ENG._COMPETITIONS",
        categoryDescription: [
            "CIRCUITS LIVE. MOTORS ROAR. ROBOTS COLLIDE.",
            "ENGINEER. BUILD. BATTLE. LET YOUR MACHINE DO THE TALKING."
        ],
        color: "#D35400",
        bgColor: "#0A0400",
    },
    {
        id: "business",
        icon: "/icons/business.svg",
        title: "BUSINESS_COMPETITIONS",
        categoryDescription: [
            "BUILD EMPIRES. BREAK MARKETS. THINK LIKE A CEO.",
            "ANALYZE THE NUMBERS. PITCH THE FUTURE. OUTPLAY THE COMPETITION."
        ],
        color: "#D000FF",
        bgColor: "#0B000E",
    },
];

async function getCompetitions() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/competitions/public`,
            { next: { revalidate: 600 } }
        );

        if (!res.ok) {
            throw new Error(`API returned ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("getCompetitions failed:", err);
        throw err; // let error.tsx catch it
    }
}

const idToCategoryMap: { [key: string]: string } = {
    "coding": "Core Coding",
    "software-eng": "Software Engineering",
    "tech-quest": "Tech Quest",
    "dev-design": "Development & Design",
    "ai-data": "AI & Data Science",
    "general": "General",
    "electrical-eng": "Electrical Engineering",
    "business": "Business",
};

export default async function ModulePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: moduleId } = await params;
    const selectedModule = modules.find((m) => m.id === moduleId);

    if (!selectedModule) {
        return (
            <ModuleNotFound moduleId={moduleId} />
        );
    }

    const competitions = await getCompetitions();
    const category = idToCategoryMap[moduleId];
    const categoryCompetitions = competitions.filter(
        (c: any) => c.category === category
    );
    return (
        <>
            <ModuleCompetitions {...selectedModule} categoryCompetitions={categoryCompetitions} />
            <RegistrationBanner />
        </>
    );
}

