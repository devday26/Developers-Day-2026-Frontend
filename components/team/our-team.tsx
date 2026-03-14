"use client";

import TeamCard from "./team-card";
import { motion } from "framer-motion";

const uiuxMembers = [
  {
    name: "ASJAD BIN REHAN",
    role: "LEAD UI/UX",
    image: "/team/uiux/asjad.png",
    linkedInUrl: "https://www.linkedin.com/in/nehaaamir17/",
  },
  {
    name: "HASSAN SAMI",
    role: "CO-LEAD UI/UX",
    image: "/team/uiux/hassan.png",
    linkedInUrl: "https://www.linkedin.com/in/muhammad-hasnain-61b4aa379/",
  },
  {
    name: "SAMEED JAMAL",
    role: "CO-LEAD UI/UX",
    image: "/team/uiux/sameed.png",
    linkedInUrl: "https://www.linkedin.com/in/shoaib-raza-9497a72b5/",
  },
  {
    name: "WAREESHA FAHEEM",
    role: "CO-LEAD UI/UX",
    image: "/team/uiux/wareesha.png",
    linkedInUrl: "https://www.linkedin.com/in/mhuzaifa777/",
  },
];

export default function OurTeam() {
  return (
    <section className="bg-dark-red text-white py-16 md:py-24">
      <div className=" container mx-auto px-4 md:px-6">
        <div className="border-l-3 border-red-primary">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 sm:mb-2 mb-4   pt-2 items-start font-mono pl-4 sm:pl-7"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-7">
                MEET_OUR_EXTENDED
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7">
                THE FACE BEHIND DEVELOPER'S DAY 2026 WEBSITE.
              </p>
            </div>
          </motion.div>

          {/* Team Cards — staggered grid */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 pl-4 sm:pl-7 uppercase font-mono tracking-wide">
            UI/UX_DESIGN
          </h1>

          <div className="h-[3px] w-full bg-gradient-to-r from-[#D71D22] to-[#191111]" />

          {/* OTHER MEMBERS GRID */}
          <div className="p-8 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {uiuxMembers.map((member, index) => (
              <motion.div
                key={member.role + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.08, 0.56),
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <TeamCard {...member} />
              </motion.div>
            ))}
          </div>
          <div className="h-[3px] w-full bg-gradient-to-r from-[#D71D22] to-[#191111]" />

        </div>
      </div>
    </section>
  );
}
