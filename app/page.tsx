import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

const experience = [
  {
    role: "Software Developer",
    company: "MW Futuretech",
    period: "Nov 2025 — Present",
    location: "Bhopal, India",
    points: [
      "Build and improve backend services and APIs using Python, FastAPI and Django REST Framework.",
      "Contribute to platform reliability, security testing, vulnerability remediation and production debugging.",
      "Improved concurrency by approximately 20% through backend optimization.",
    ],
  },
  {
    role: "Backend Engineer",
    company: "Zenova Lifestyle",
    period: "Aug 2024 — Oct 2025",
    location: "Remote",
    points: [
      "Developed backend services supporting 5K+ monthly users.",
      "Reduced query response time by 25% through database and API optimization.",
      "Helped reduce production errors by 15% through debugging and reliability improvements.",
    ],
  },
];

const skills = [
  { label: "Backend", items: ["Python", "FastAPI", "Django", "Node.js", "Express"] },
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { label: "Data", items: ["Firebase", "SQL", "NoSQL", "Vector Search"] },
  { label: "Infrastructure", items: ["Docker", "AWS", "Jenkins", "Vercel", "Git"] },
  { label: "AI & Automation", items: ["RAG", "LangChain", "LangGraph", "LLM APIs", "MCP"] },
  { label: "Quality & Security", items: ["Playwright", "OWASP", "API Security", "Testing"] },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb" aria-hidden="true" />
          <div className="hero-content">
            <Reveal>
              <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> INDIA</div>
              <h1>Kushagra<br /><span className="hero-serif">Pandey.</span></h1>
              <p className="hero-copy">
                I build <span>reliable systems</span>, useful products and thoughtful software experiences.
                Focused on backend engineering, full-stack development and applied AI.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={16} /></a>
                <a className="button button-quiet" href="#contact">Get in touch <ArrowDown size={15} /></a>
              </div>
              <div className="hero-meta">
                <span>PYTHON · TYPESCRIPT · SYSTEMS</span>
                <span>SCROLL TO EXPLORE <ArrowDown size={12} /></span>
              </div>
            </Reveal>
          </div>
          <div className="hero-side-note">ENGINEERING WITH INTENT — 2026</div>
        </section>

        <section className="metrics section-shell" aria-label="Selected experience metrics">
          <Reveal className="metric-intro"><span className="section-kicker">01 / AT A GLANCE</span><p>A few signals from the systems and products I’ve helped build.</p></Reveal>
          <div className="metric-grid">
            <Reveal className="metric"><strong>100K<span>+</span></strong><span>Platform users <i>· MW Futuretech</i></span></Reveal>
            <Reveal className="metric"><strong>5K<span>+</span></strong><span>Monthly users <i>· Zenova Lifestyle</i></span></Reveal>
            <Reveal className="metric"><strong>20K<span>+</span></strong><span>Recipes indexed <i>· DTPS</i></span></Reveal>
            <Reveal className="metric"><strong>20<span>%</span></strong><span>Concurrency improvement <i>· MW Futuretech</i></span></Reveal>
          </div>
        </section>

        <section className="work section-shell section-space" id="work">
          <div className="section-heading">
            <Reveal><span className="section-kicker">02 / SELECTED WORK</span><h2>Things I’ve<br /><span className="muted">put into motion.</span></h2></Reveal>
            <Reveal><p className="section-aside">A selection of products and experiments across backend systems, interactive applications and applied AI.</p></Reveal>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </section>

        <section className="experience section-shell section-space" id="experience">
          <div className="section-heading">
            <Reveal><span className="section-kicker">03 / EXPERIENCE</span><h2>Built through<br /><span className="muted">real work.</span></h2></Reveal>
            <Reveal><p className="section-aside">Production experience, practical problem-solving and a focus on making software more dependable.</p></Reveal>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <Reveal className="timeline-item" key={item.company}>
                <div className="timeline-marker">{String(index + 1).padStart(2, "0")}</div>
                <div className="timeline-main">
                  <div className="timeline-top"><div><h3>{item.role}</h3><p className="company">{item.company} <span>· {item.location}</span></p></div><span className="period">{item.period}</span></div>
                  <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="toolkit section-shell section-space" id="toolkit">
          <div className="section-heading">
            <Reveal><span className="section-kicker">04 / TOOLKIT</span><h2>The tools are<br /><span className="muted">part of the craft.</span></h2></Reveal>
            <Reveal><p className="section-aside">A practical toolkit chosen to solve problems—not a list of technologies for its own sake.</p></Reveal>
          </div>
          <div className="skill-grid">
            {skills.map((group, index) => (
              <Reveal className="skill-card" key={group.label}>
                <span className="skill-index">0{index + 1}</span><h3>{group.label}</h3>
                <div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="principles section-shell section-space" id="approach">
          <Reveal><span className="section-kicker">05 / HOW I ENGINEER</span><h2>Good engineering is<br /><span className="muted">felt, not announced.</span></h2></Reveal>
          <div className="principle-grid">
            <Reveal className="principle"><span>01</span><h3>Performance with purpose</h3><p>Make the common path fast, measure bottlenecks and optimize where it matters.</p></Reveal>
            <Reveal className="principle"><span>02</span><h3>Security by design</h3><p>Build with careful validation, sensible access control and a habit of looking for failure modes.</p></Reveal>
            <Reveal className="principle"><span>03</span><h3>Simple, dependable systems</h3><p>Choose the smallest sound solution that can evolve with the product.</p></Reveal>
          </div>
        </section>

        <section className="contact section-shell section-space" id="contact">
          <Reveal>
            <span className="section-kicker">06 / CONTACT</span>
            <h2>Have a good problem?<br /><span className="muted">Let’s solve it.</span></h2>
            <p className="contact-copy">I’m interested in thoughtful teams, challenging engineering problems and products with real users.</p>
            <a className="contact-email" href="mailto:kushagrapandeycodes@gmail.com">kushagrapandeycodes@gmail.com <MoveUpRight size={20} /></a>
          </Reveal>
          <div className="contact-bottom">
            <div className="social-links">
              <a href="https://github.com/kushagrapandeyyy" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
              <a href="https://www.linkedin.com/in/kushagra-pandey-66421424a/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a href="mailto:kushagrapandeycodes@gmail.com"><Mail size={16} /> Email <ArrowUpRight size={13} /></a>
            </div>
            <span className="footer-note">© 2026 KUSHAGRA PANDEY · BUILT WITH INTENT</span>
          </div>
        </section>
      </main>
    </>
  );
}
