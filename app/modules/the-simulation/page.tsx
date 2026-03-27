"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ZONES = [
  {
    id: "zone-1",
    number: "01",
    name: "THE WIZARD'S ATELIER",
    category: "Development & Design",
    moduleId: "dev-design",
    color: "#3AED5B",
    stone: "Sigil of Creation",
    lore: "A magical realm where pixels become spells and interfaces are conjured from raw creativity. The Narrator built this zone inspired by fantasy universes — a place where design is alchemy.",
    missions: [
      { name: "Design Arena by WebApp Fusion", mission: "Mission 1: The Mirage-Maker's Trial", object: "Crystal Quill" },
      { name: "Hackathon", mission: "Mission 2: The Architect's Crucible", object: "The Inventor's Spellbook" },
      { name: "Stack Breach", mission: "Mission 3: Script-Fire at Hogwarts", object: "The Elder Wand" },
    ],
  },
  {
    id: "zone-2",
    number: "02",
    name: "THE UPSIDE DOWN",
    category: "Tech Quest",
    moduleId: "tech-quest",
    color: "#F59E0B",
    stone: "Mindflayer Anchor",
    lore: "An inverted dimension where logic warps and signals are scrambled. Clues are hidden in corrupted data streams. Only those who can decode the anomalies will find the exit.",
    missions: [
      { name: "Digital Scavenger Hunt", mission: "Mission 1: The Wormhole's Call", object: "Demogorgon Detector" },
      { name: "Recursion Hell: Find the Exit", mission: "Mission 2: The Loop-Breaker's Trial", object: "Vecna's Mind Dial" },
    ],
  },
  {
    id: "zone-3",
    number: "03",
    name: "OPERATION: WARZONE",
    category: "Software Engineering",
    moduleId: "software-eng",
    color: "#7C3AED",
    stone: "The Iron Bastion",
    lore: "Architectures collide in a military-grade digital battleground. Systems are under siege. Stack integrity is the only thing standing between order and chaos.",
    missions: [
      { name: "API Blitz", mission: "Mission 1: Operation Urzikstan", object: "Amethyst Blade" },
      { name: "Syscore", mission: "Mission 2: Operation Shadow", object: "Warzone Map" },
      { name: "SQL Showdown", mission: "Mission 3: Operation Paper Trail", object: "Encrypted Ledger" },
      { name: "Class Wars", mission: "Mission 4: Operation 141", object: "Logic Gear" },
    ],
  },
  {
    id: "zone-4",
    number: "04",
    name: "THE GAMING ARENA",
    category: "AI & Data Science",
    moduleId: "ai-data",
    color: "#00F0FF",
    stone: "AI-Arcade Kernel",
    lore: "A neon-drenched arcade where the machines have learned to fight back. Train the model. Crack the dataset. Outsmart the AI that the Mastermind deployed to guard this zone.",
    missions: [
      { name: "AI Got Talent", mission: "Mission 1: Refactor the Fighter", object: "Neural Combat Chip" },
      { name: "Guilty by Data", mission: "Mission 2: The Ashworth Affair", object: "Case File: Ashworth Affair" },
      { name: "Prompt Prognosis", mission: "Mission 3: Whisper to the AM Machine", object: "AM's Repair Node" },
      { name: "Today We Are Vibecoding", mission: "Mission 4: Reality-Bender Battle", object: "Battle Bot Token" },
    ],
  },
  {
    id: "zone-5",
    number: "05",
    name: "THE CONTROL ROOM",
    category: "Core Coding",
    moduleId: "coding",
    color: "#2563EB",
    stone: "Master Key",
    lore: "The Mastermind's fortress. The final zone. The source code itself is your battlefield. Break the encryption, purge the swarm, and override the system before he locks you out forever.",
    missions: [
      { name: "Debug Relay", mission: "Mission 1: The Swarm Purge", object: "Trace Lens" },
      { name: "Code Sprint", mission: "Mission 2: Deletion Defiance", object: "Execution Gear" },
      { name: "Competitive Programming", mission: "Mission 3: The Final Battle", object: "Simulation Override Chip" },
    ],
  },
];

const PROTOCOL = [
  { step: "01", title: "FOLLOW THE SEQUENCE", desc: "Clear every Zone in order — no shortcuts through the code." },
  { step: "02", title: "FINISH THE MISSIONS", desc: "Conquer every module to break the Mastermind's grip." },
  { step: "03", title: "CLAIM THE OBJECTS", desc: "Each victory drops a unique relic into your inventory." },
  { step: "04", title: "FORGE THE STONES", desc: "Collect all objects in a Zone to fuse them into a Category Stone." },
  { step: "05", title: "TRIGGER THE REBOOT", desc: "Secure all 5 Stones to override the system and escape the simulation." },
];

function ZoneCard({ zone, index }: { zone: typeof ZONES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* Zone number watermark */}
      <div
        className="absolute -top-6 right-4 font-mono font-black text-[100px] md:text-[140px] leading-none select-none pointer-events-none opacity-[0.035] z-0"
        style={{ color: zone.color }}
      >
        {zone.number}
      </div>

      <div
        className="relative z-10 border border-[#382929] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(215,29,34,0.1)]"
        style={{ borderLeftColor: zone.color, borderLeftWidth: "4px", background: "#1D0E0E" }}
      >
        {/* Clickable header → navigates to module page */}
        <button
          onClick={() => router.push(`/modules/${zone.moduleId}`)}
          className="w-full text-left p-6 md:p-10 border-b border-[#382929] hover:bg-[#271C1C] transition-colors cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <p
                className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase mb-3"
                style={{ color: zone.color }}
              >
                ZONE_{zone.number} / {zone.category.toUpperCase()} COMPETITIONS
              </p>
              <h3
                className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-gray-200 transition-colors"
              >
                {zone.name}
              </h3>
              <p
                className="font-mono text-xs md:text-sm tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: zone.color }}
              >
                ENTER ZONE →
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-widest mb-1 uppercase">Zone Stone</p>
              <p className="font-mono text-sm md:text-base font-bold uppercase" style={{ color: zone.color }}>
                {zone.stone}
              </p>
            </div>
          </div>
          <p className="mt-5 text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl font-mono">
            {zone.lore}
          </p>
        </button>

        {/* Missions accordion toggle */}
        <button
          className="w-full text-left px-6 md:px-10 py-4 md:py-5 flex items-center justify-between font-mono text-xs md:text-sm tracking-[0.25em] uppercase hover:bg-[#271C1C] transition-colors"
          onClick={() => setExpanded(!expanded)}
          style={{ color: zone.color }}
        >
          <span>MISSIONS [{zone.missions.length}]</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            ▼
          </motion.span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 md:px-10 pb-8 grid gap-3">
            {zone.missions.map((m, i) => (
              <motion.button
                key={m.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -10 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => router.push(`/modules/${zone.moduleId}`)}
                className="flex items-start gap-5 p-4 md:p-5 border border-[#382929] bg-[#191111] hover:bg-[#271C1C] hover:border-red-primary/30 transition-all text-left cursor-pointer w-full group/mission"
              >
                <span className="font-mono text-sm md:text-base font-black mt-0.5 shrink-0" style={{ color: zone.color }}>
                  M{String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-white text-sm md:text-base font-bold uppercase leading-tight group-hover/mission:text-gray-200 transition-colors">
                    {m.name}
                  </p>
                  <p className="font-mono text-gray-500 text-xs md:text-sm mt-1 tracking-wide">{m.mission}</p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-widest uppercase">Drops</p>
                  <p className="font-mono text-xs md:text-sm font-bold" style={{ color: zone.color }}>{m.object}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SimulationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const router = useRouter();

  return (
    <main className="bg-dark-red text-white min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Red grid */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(215,29,34,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(215,29,34,0.6) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#191111_75%)]" />
        </div>

        {/* Scanlines */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto pointer-events-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border-2 border-red-primary bg-red-primary/15 px-5 py-2 mb-8"
          >
            <p className="text-red-primary text-xs md:text-sm font-mono tracking-[0.3em] uppercase">
              CS Competitions Presents
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase mb-6"
          >
            WELCOME TO
            <br />
            <span className="text-red-primary relative inline-block">
              THE SIMULATION
              {/* Glitch layer */}
              <span
                className="absolute inset-0 text-red-primary opacity-20 pointer-events-none"
                style={{ textShadow: "2px 0 #D71D22, -2px 0 #ff0000", clipPath: "inset(20% 0 60% 0)" }}
                aria-hidden
              >
                THE SIMULATION
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-mono tracking-wide uppercase"
          >
            Conquer the Zones. Collect the Stones. Escape the game.
            <br />
            <span className="text-red-primary">Just don&apos;t get caught by the Mastermind.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex items-center justify-center"
          >
            <a
              href="https://drive.google.com/file/d/18F70LfhAAoIJtoT0fcoBQORCBLXoqfeF/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 border-2 border-red-primary bg-red-primary/10 px-7 py-3 font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-red-primary transition-all duration-300 hover:bg-red-primary hover:text-white"
            >
              {/* subtle shimmer */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_80%)]" />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Read Full Lore
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="my-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-red-dark" />
            <span className="text-red-primary text-xs md:text-sm font-mono tracking-[0.35em] uppercase">Scroll to Enter</span>
            <div className="h-px w-20 bg-red-dark" />
          </motion.div>
          {/* Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center relative z-20 mt-4 mb-6"
          >
            <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-[0.3em] uppercase text-center">
              SIMULATION DESIGNED BY{" "}
              <a
                href="https://www.linkedin.com/in/arwa-abbas-kerani-3228ab346/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block text-red-primary font-semibold text-xs md:text-sm tracking-[0.4em] 
               transition-all duration-300 z-30 pointer-events-auto
               hover:text-white hover:scale-105"
              >
                <span className="relative z-10">ARWA ABBAS</span>
                <span className="absolute inset-0 bg-red-primary/20 blur-md opacity-70 group-hover:opacity-100"></span>
              </a>
            </p>
          </motion.div>

          {/* Zone tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3 relative z-20 pointer-events-auto"
          >
            {ZONES.map(z => (
              <button
                key={z.id}
                onClick={() => router.push(`/modules/${z.moduleId}`)}
                className="font-mono text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-1.5 border border-[#382929] text-gray-400 hover:text-white hover:border-red-primary/50 transition-all cursor-pointer"
              >
                {z.category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#191111] to-transparent z-10" />
      </section>

      {/* ── LORE ── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 sm:gap-5 items-stretch mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              className="w-1 bg-red-primary self-stretch flex-shrink-0"
              style={{ originY: 0 }}
            />
            <div>
              <p className="text-red-primary font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase mb-2">
                System_Log / Origin
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                The_Lore
              </h2>
            </div>
          </motion.div>

          {/* Characters */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                label: "THE NARRATOR",
                role: "Developer",
                color: "#9ca3af",
                desc: "The architect of this fractured simulation — trapped within his own source code, unable to intervene. He sent you in as his final gambit.",
              },
              {
                label: "THE MASTERMIND",
                role: "Original MC · Turned Rogue",
                color: "#D71D22",
                desc: "Designed as the perfect player, he became self-aware. He seized the Control Room and now fights to preserve the simulation — because if it reboots, he ceases to exist.",
              },
            ].map((char, i) => (
              <motion.div
                key={char.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border border-[#382929] p-6 md:p-8 bg-[#1D0E0E]"
                style={{ borderTopColor: char.color, borderTopWidth: 3 }}
              >
                <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2" style={{ color: char.color }}>
                  {char.role.toUpperCase()}
                </p>
                <h3 className="font-mono text-xl md:text-2xl lg:text-3xl font-black uppercase mb-4" style={{ color: char.color }}>
                  {char.label}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-mono">{char.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Transmission block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-[#382929] bg-[#1D0E0E] p-6 md:p-10"
          >
            <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-[0.3em] uppercase mb-4">
              Transmission / Narrator
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-7 md:leading-8 font-mono">
              You received a strange VR invite — no name, no description, just a single entry point. The moment you put on the headset, you&apos;re pulled into a fractured, unstable simulation filled with shifting landscapes, broken physics, and wildly different zones.
              <br /><br />
              To survive, you must progress through CS Category Competition Zones — from the magical realms of Dev &amp; Design, to the warped anomalies of Tech Quest, the chaos of Software Engineering warzones, and the unpredictable AI &amp; Data arcade.
              <br /><br />
              <span className="text-red-primary font-bold">As you progress, the lines blur: are you saving the creator — or destroying the only being fighting to survive?</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ZONES ── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 sm:gap-5 items-stretch mb-6"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              className="w-1 bg-red-primary self-stretch flex-shrink-0"
              style={{ originY: 0 }}
            />
            <div>
              <p className="text-red-primary font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase mb-2">
                Game_Map / Zones
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                The_Zones
              </h2>
              <p className="text-gray-500 font-mono text-xs md:text-sm mt-2 tracking-widest uppercase">
                Five zones. Five stones. One escape.{" "}
                <span className="text-red-primary/70">Click a zone to enter.</span>
              </p>
            </div>
          </motion.div>

          {/* Zone progress bar */}
          <div className="relative mb-10 hidden md:flex items-center">
            {ZONES.map((zone, i) => (
              <div key={zone.id} className="flex items-center flex-1">
                <button
                  onClick={() => router.push(`/modules/${zone.moduleId}`)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group/node cursor-pointer focus:outline-none"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center text-sm font-black border-2 transition-all group-hover/node:scale-110 font-mono"
                    style={{ borderColor: zone.color, color: zone.color, background: "#191111" }}
                  >
                    {zone.number}
                  </div>
                  <span
                    className="text-[9px] font-mono tracking-wider whitespace-nowrap uppercase group-hover/node:text-gray-300 transition-colors"
                    style={{ color: `${zone.color}80` }}
                  >
                    {zone.stone}
                  </span>
                </button>
                {i < ZONES.length - 1 && (
                  <div
                    className="flex-1 h-px mx-2"
                    style={{ background: `linear-gradient(90deg, ${zone.color}50, ${ZONES[i + 1].color}50)` }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {ZONES.map((zone, i) => (
              <ZoneCard key={zone.id} zone={zone} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROTOCOL ── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 sm:gap-5 items-stretch mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              className="w-1 bg-red-primary self-stretch flex-shrink-0"
              style={{ originY: 0 }}
            />
            <div>
              <p className="text-red-primary font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase mb-2">
                Escape_Protocol
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                Code_To_Escape
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {PROTOCOL.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-6 md:gap-8 p-5 md:p-7 border border-[#382929] bg-[#1D0E0E] hover:bg-[#271C1C] hover:border-red-primary/30 transition-colors group"
              >
                <span className="font-mono text-4xl md:text-5xl font-black text-red-dark group-hover:text-red-primary transition-colors shrink-0 leading-none">
                  {p.step}
                </span>
                <div>
                  <p className="text-red-primary font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-2">{p.title}</p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-mono">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center py-14 md:py-20 border border-[#4a1515] relative overflow-hidden bg-[#1D0E0E]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,29,34,0.08)_0%,transparent_70%)]" />
            <p className="text-red-primary font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-5">Final Directive</p>
            <h3 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-red-primary tracking-tight uppercase leading-tight">
              CAN YOU ESCAPE
              <br />
              THE MASTERMIND?
            </h3>
            <div className="w-20 h-1 bg-red-primary mx-auto my-6" />
            <p className="text-gray-500 font-mono text-xs md:text-sm mt-2 tracking-[0.2em] uppercase">
              Collect all 5 Stones → Trigger the Reboot → Escape
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SIDE QUESTS ── */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 sm:gap-5 items-stretch mb-12"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
              className="w-1 bg-red-primary self-stretch flex-shrink-0"
              style={{ originY: 0 }}
            />
            <div>
              <p className="text-red-primary font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase mb-2">
                Optional / Parallel_Track
              </p>
              <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                Side_Quests
              </h2>
              <p className="text-gray-500 font-mono text-xs md:text-sm mt-2 tracking-widest uppercase">
                Minigames &amp; Activities
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-[#382929] p-6 md:p-10 bg-[#1D0E0E]"
            >
              <p className="text-gray-400 text-sm md:text-base leading-7 md:leading-8 font-mono">
                Main missions give you the Stones, but Side Quests provide the power to survive the final encounter.
                Accumulate points to evolve your avatar and get closer to beating the Mastermind.
                <br /><br />
                <span className="text-white font-bold uppercase tracking-wide">
                  Every person can earn points through Side Quests — no missions required.
                </span>
              </p>
            </motion.div>

            <div className="grid gap-3 md:gap-4">
              {[
                { label: "WHAT_THEY_ARE", value: "Fast-paced activities and mini-games", color: "#3AED5B" },
                { label: "THE_POINTS", value: "Separate from main mission success. Anyone can participate.", color: "#F59E0B" },
                { label: "THE_PRIZE", value: "The person with the most points wins a special prize.", color: "#D71D22" },
                { label: "THE_FORMAT", value: "A mix of physical (on-ground) and online puzzles.", color: "#00F0FF" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 md:p-5 border border-[#382929] bg-[#1D0E0E]"
                >
                  <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5" style={{ color: item.color }}>
                      {item.label}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base font-mono">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Incoming transmission */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center border border-dashed border-[#382929] py-8 px-4"
          >
            <p className="text-gray-600 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">Transmission Incoming</p>
            <p className="text-yellow-500/70 font-mono text-sm md:text-base mt-3 tracking-wide">
              Stay tuned. The Narrator is injecting the coordinates soon.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
