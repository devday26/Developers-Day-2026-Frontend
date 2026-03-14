"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  id: string;
  linkedInUrl?: string;
}

export default function ExcomCard({ name, role, image, id, linkedInUrl }: TeamCardProps) {
  return (
    <div className="relative bg-[#1C0D0D] border-5 border-[#332323] overflow-hidden flex flex-col min-h-[350px] h-full">

      {/* Image — fixed height, never grows */}
      <div className="relative flex-shrink-0 w-full h-[265px] border-[#1C0D0D] border-2">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain object-bottom pt-2
            bg-[radial-gradient(50%_50%_at_50%_50%,#7F7F7F_0%,#383838_37.02%,#272727_65.38%,#191919_100%)]"
        />

        {linkedInUrl && (
          <Button
            as={Link}
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 py-2 px-3.5 bg-[#353535] hover:bg-gray-700 text-white font-mono text-xs"
            radius="full"
            size="sm"
            endContent={<ArrowUpRightIcon className="w-3 h-3" />}
          >
            LinkedIn
          </Button>
        )}

        <div className="absolute top-2 right-2 text-sm font-mono font-bold px-1 bg-black text-[#6E1617]">
          {id}
        </div>
      </div>

      {/* Text — grows to fill whatever space the tallest card in the row creates */}
      <div className="flex-1 w-full px-3 py-2">
        <p className="text-xl font-mono font-bold uppercase tracking-wider">
          {name}
        </p>
        <h3 className="text-base uppercase mt-1 font-bold text-[#6E1617]">
          {role}
        </h3>
      </div>

    </div>
  );
}