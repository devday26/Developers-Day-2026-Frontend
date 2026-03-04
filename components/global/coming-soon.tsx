"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface ComingSoonProps {
  /** Page/section name shown as title (e.g. "MODULES", "EVENT_DETAILS") */
  title?: string;
  /** Short description below the title */
  description?: string;
}

const defaultTitle = "COMING_SOON";
const defaultDescription =
  "THIS_PAGE_IS_UNDER_CONSTRUCTION._CHECK_BACK_SOON.";

export default function ComingSoon({
  title = defaultTitle,
  description = defaultDescription,
}: ComingSoonProps) {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-dark-red text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-block border-2 border-red-primary bg-red-primary/15 px-4 py-2 mb-8">
          <p className="text-red-primary text-xs md:text-sm font-mono tracking-wider">
            UNDER_CONSTRUCTION
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4 font-mono tracking-wide">
          {title.replace(/_/g, " ")}
        </h1>
        <div className="w-20 h-1 bg-red-primary mx-auto mb-6" />
        <p className="text-gray-400 text-sm md:text-base font-mono tracking-wider mb-10">
          {description.replace(/_/g, " ")}
        </p>

        <Button
          as={Link}
          href="/"
          className="bg-red-primary hover:bg-red-700 text-white font-bold"
          radius="none"
          startContent={<ArrowLeftIcon className="w-5 h-5" />}
        >
          BACK_TO_HOME
        </Button>
      </div>
    </section>
  );
}
