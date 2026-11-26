import Image from "next/image";
import { type CSSProperties } from "react";
import { Reveal } from "@/components/reveal";

type Tone = "red" | "blue";
type Packet = { tone: Tone; path: string; duration: number; delay: number };
type Pulse = { x: number; y: number; rx: number; ry: number; duration: number; delay: number; opacity: number };
type VisualSystem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  tags: string;
  packets: Packet[];
  pulses?: Pulse[];
};

const flowColors = {
  red: { light: "#ff9cab", glow: "#f43154" },
  blue: { light: "#b0efff", glow: "#2388ff" },
};

// Paths use the same 3:2 coordinates as the raster artwork.
const visualSystems = [
  {
    id: "backend",
    title: "Backend Architecture",
    image: "/systems-backend.webp",
    alt: "Red connections link a central server rack to services above and databases below.",
    description: "API communication, layered services and distributed data flows connecting applications to storage.",
    tags: "APIs / SERVICES / DATABASES",
    packets: [
      { tone: "red", path: "M210 113 V120 C210 131 218 137 232 137 H421 C435 137 444 146 444 159", duration: 6.4, delay: -1.5 },
      { tone: "red", path: "M695 113 V120 Q695 137 674 137 H480 Q454 137 454 160", duration: 5.5, delay: -2.4 },
      { tone: "red", path: "M450 357 V370 Q450 386 425 386 H238 Q213 386 207 406", duration: 6.2, delay: -1.8 },
      { tone: "red", path: "M450 357 V370 C450 381 461 386 478 386 H644 C666 386 675 395 681 406", duration: 7.8, delay: -4 },
    ],
  },
  {
    id: "ai",
    title: "AI Engineering",
    image: "/systems-network.webp",
    alt: "A blue mesh branches out to stacked data layers, connected nodes and tools.",
    description: "Vector retrieval, LLM orchestration and connected agents and tools that support intelligent workflows.",
    tags: "RETRIEVAL / MODELS / TOOLS",
    packets: [
      { tone: "blue", path: "M445 393 L444 308 L443 223", duration: 6.9, delay: -1.8 },
      { tone: "blue", path: "M444 308 L495 290 L577 293 L652 294", duration: 5.2, delay: -2.8 },
      { tone: "blue", path: "M577 242 C598 238 605 223 611 196 C620 166 633 155 651 157 H667", duration: 5.9, delay: -3.7 },
    ],
    pulses: [
      { x: 443, y: 223, rx: 13, ry: 13, duration: 7.3, delay: -4.4, opacity: .64 },
      { x: 577, y: 242, rx: 11, ry: 11, duration: 8.6, delay: -1.6, opacity: .58 },
    ],
  },
  {
    id: "security",
    title: "Security & Infrastructure",
    image: "/systems-security.webp",
    alt: "A blue shield sits at the center of a network of servers and devices.",
    description: "Encrypted connections, authentication layers, infrastructure monitoring and deployment pipelines.",
    tags: "ACCESS / NETWORK / DELIVERY",
    packets: [
      { tone: "blue", path: "M239 477 L263 465 Q269 463 269 457 V445 Q269 438 278 434 L359 399", duration: 7.4, delay: -1.7 },
      { tone: "red", path: "M574 263 L578 227 L646 202 L728 167", duration: 5.8, delay: -1.9 },
      { tone: "red", path: "M542 389 L663 436", duration: 6.1, delay: -3.4 },
    ],
    pulses: [
      { x: 436, y: 352, rx: 52, ry: 35, duration: 9.2, delay: -2.7, opacity: .35 },
    ],
  },
] satisfies VisualSystem[];

function DataFlow({ id, packets, pulses }: Pick<VisualSystem, "id" | "packets" | "pulses">) {
  const tones = new Set(packets.map(packet => packet.tone));
  const glowId = (tone: Tone) => `showcase-${id}-${tone}-glow`;

  return (
    <svg className="showcase-flow" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        {[...tones].map(tone => (
          <radialGradient key={tone} id={glowId(tone)}>
            <stop offset="0%" stopColor={flowColors[tone].light} stopOpacity=".83" />
            <stop offset="45%" stopColor={flowColors[tone].glow} stopOpacity=".48" />
            <stop offset="100%" stopColor={flowColors[tone].glow} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      {pulses?.map(({ x, y, rx, ry, duration, delay, opacity }) => (
        <ellipse
          className="showcase-node-pulse"
          key={x}
          cx={x}
          cy={y}
          rx={rx}
          ry={ry}
          fill={`url(#${glowId("blue")})`}
          style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s`, "--pulse-opacity": opacity } as CSSProperties}
        />
      ))}
      {packets.map(({ tone, path, duration, delay }) => (
        <g
          key={path}
          fill="none"
          strokeLinecap="round"
          style={{ "--ray-period": `${duration / 2}s`, "--ray-delay": `${delay}s` } as CSSProperties}
        >
          <path className="showcase-packet" d={path} pathLength="100" stroke={flowColors[tone].glow} strokeWidth="9" strokeDasharray="23 77" opacity=".4" />
          <path className="showcase-packet" d={path} pathLength="100" stroke={flowColors[tone].light} strokeWidth="3" strokeDasharray="16 84" />
        </g>
      ))}
    </svg>
  );
}

export default function EngineeringVisuals() {
  return (
    <section className="showcase section-shell section-space" id="showcase" aria-labelledby="showcase-title" tabIndex={-1}>
      <Reveal className="section-heading">
        <h2 id="showcase-title">What I build</h2>
        <p className="section-aside">Concept illustrations of the systems and patterns I work with.</p>
      </Reveal>
      <div className="showcase-grid">
        {visualSystems.map(system => (
          <ShowcaseCard key={system.id} system={system} />
        ))}
      </div>
    </section>
  );
}

function ShowcaseCard({ system }: { system: VisualSystem }) {
  const { title, image, alt, description, tags } = system;
  return (
    <Reveal className="showcase-item">
      <figure className="showcase-figure">
        <div className="showcase-image">
          <div className="showcase-media">
            <div className="showcase-art">
              <Image src={image} alt={alt} fill loading="lazy" sizes="(max-width: 535px) 90vw, (max-width: 700px) 44vw, (max-width: 1420px) 29vw, 415px" />
              <DataFlow id={system.id} packets={system.packets} pulses={system.pulses} />
            </div>
          </div>
        </div>
        <figcaption>
          <p className="section-kicker"><span className="glitch-text">{tags}</span></p>
          <h3>{title}</h3>
          <p className="showcase-description">{description}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}
