import Image from "next/image";
import { Reveal } from "@/components/reveal";

const visualSystems = [
  {
    title: "Backend Architecture",
    image: "/systems-backend.webp",
    description: "API communication, layered services and distributed data flows connecting applications to storage.",
    tags: "APIs / SERVICES / DATABASES",
  },
  {
    title: "AI Engineering",
    image: "/systems-network.webp",
    description: "Vector retrieval, LLM orchestration and connected agents and tools that support intelligent workflows.",
    tags: "RETRIEVAL / MODELS / TOOLS",
  },
  {
    title: "Security & Infrastructure",
    image: "/systems-security.webp",
    description: "Encrypted connections, authentication layers, infrastructure monitoring and deployment pipelines.",
    tags: "ACCESS / NETWORK / DELIVERY",
  },
];

export default function EngineeringVisuals() {
  return (
    <section className="showcase section-shell section-space" id="showcase" aria-labelledby="showcase-title">
      <Reveal className="section-heading">
        <h2 id="showcase-title">What I build<span className="accent">.</span></h2>
        <p className="section-aside">Concept illustrations of the systems and patterns I work with.</p>
      </Reveal>
      <div className="showcase-grid">
        {visualSystems.map(({ title, image, description, tags }) => (
          <Reveal className="showcase-item" key={title}>
            <figure className="showcase-figure">
              <div className="showcase-image">
                <div className="showcase-media">
                  <Image src={image} alt="" fill loading="lazy" sizes="(max-width: 535px) 100vw, (max-width: 700px) 48vw, 420px" />
                </div>
                <div className="showcase-flow" aria-hidden="true" />
              </div>
              <figcaption>
                <p className="section-kicker">{tags}</p>
                <h3>{title}</h3>
                <p className="showcase-description">{description}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
