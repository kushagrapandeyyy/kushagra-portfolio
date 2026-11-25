import { ArrowUpRight, BrainCircuit, Cloud, PanelsTopLeft, Plus, Server, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import EngineeringVisuals from "@/components/engineering-visuals";
import Hero from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { approach, arsenal, domains, experience, metrics, relatedExperience } from "@/lib/data";

const domainIcons = [Server, BrainCircuit, ShieldCheck, Cloud, PanelsTopLeft];

function SectionHeading({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="section-heading">
      <h2 id={id}>{title}<span className="accent">.</span></h2>
      {children && <p className="section-aside">{children}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />

        <section className="impact section-shell section-space" id="impact" aria-labelledby="impact-title">
          <SectionHeading id="impact-title" title="Engineering impact">Measured outcomes from separate systems and engagements.</SectionHeading>
          <dl className="metric-grid">
            {metrics.map(({ value, suffix, context, outcome }) => (
              <div className="metric" key={context} data-reveal>
                <dt>
                  <span className="section-kicker">{context}</span>
                  <span className="metric-outcome">{outcome}</span>
                </dt>
                <dd>
                  <span aria-hidden="true">
                    <span className="metric-digits">
                      <span className="metric-reserve">{value}</span>
                      <span data-count={value}>{value}</span>
                    </span>
                    <span className="metric-suffix">{suffix}</span>
                  </span>
                  <span className="sr-only">{value}{suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="domains section-shell section-space" id="domains" aria-labelledby="domains-title">
          <div className="domains-intro">
            <SectionHeading id="domains-title" title="Five engineering domains">
              From the API and data model to the interface, deployment and production diagnostics.
            </SectionHeading>
          </div>
          <div className="domain-list">
            {domains.map((domain, index) => {
              const Icon = domainIcons[index];

              return (
                <details className="domain-card" name="engineering-domains" open={index === 0} key={domain.title} data-reveal>
                  <summary>
                    <span className="domain-icon" aria-hidden="true"><Icon size={21} strokeWidth={1.6} /></span>
                    <span className="domain-title">{domain.title}</span>
                    <Plus className="domain-toggle" size={19} aria-hidden="true" />
                  </summary>
                  <div className="domain-body">
                    <p>{domain.description}</p>
                    <ul className="domain-capabilities">{domain.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
                    <ul className="domain-technologies" aria-label="Technologies">
                      {domain.technologies.split(", ").map(technology => <li key={technology}>{technology}</li>)}
                    </ul>
                    {"familiarity" in domain && <p className="domain-familiarity">{domain.familiarity}</p>}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="arsenal section-shell section-space" id="arsenal" aria-labelledby="arsenal-title">
          <SectionHeading id="arsenal-title" title="Technical arsenal" />
          <dl className="arsenal-grid">
            {arsenal.map(item => (
              <div className="arsenal-item" key={item.label} data-reveal>
                <dt>{item.label}</dt>
                <dd>{item.tools}{"note" in item && <small>{item.note}</small>}</dd>
              </div>
            ))}
          </dl>
        </section>

        <EngineeringVisuals />

        <section className="experience section-shell section-space" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading">
            <SectionHeading id="experience-title" title="Professional experience">Production engineering across backend services, application security, product development and AI.</SectionHeading>
            <Reveal className="experience-duration"><strong>≈ 2.4</strong><span className="section-kicker">Years of engineering</span></Reveal>
          </div>
          <div className="experience-grid">
            <ol className="timeline">
              {experience.map(({ start, end, heading, description }) => (
                <li key={start.iso} data-reveal>
                  <span className="timeline-node" aria-hidden="true" />
                  <p className="section-kicker timeline-date">
                    <time dateTime={start.iso}>{start.label}</time> <span className="sr-only">to</span><span aria-hidden="true">/</span> {end ? <time dateTime={end.iso}>{end.label}</time> : "Present"}
                  </p>
                  <h3>{heading}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="experience-related">
              {relatedExperience.map(({ heading, description }) => (
                <Reveal className="experience-contribution" key={heading}>
                  <h3>{heading}</h3>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="approach section-shell section-space" id="approach" aria-labelledby="approach-title">
          <SectionHeading id="approach-title" title="Engineering approach">From the first requirements conversation through deployment and iteration.</SectionHeading>
          <ol className="approach-list">
            {approach.map(({ stage, description }, index) => (
              <li className="approach-stage" key={stage} data-reveal>
                <span className="stage-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact section-shell section-space" id="contact" aria-labelledby="contact-title">
          <Reveal className="contact-panel">
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">Let’s bring a complex<br className="contact-break" /> idea into production<span className="accent">.</span></h2>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:kushagrapandeycodes@gmail.com">
                Email me <ArrowUpRight className="button-arrow diagonal" size={16} aria-hidden="true" />
              </a>
              <a className="button button-quiet" href="https://www.linkedin.com/in/kushagra-pandey-66421424a/" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight className="button-arrow diagonal" size={16} aria-hidden="true" />
              </a>
            </div>
            <a className="contact-address" href="mailto:kushagrapandeycodes@gmail.com">kushagrapandeycodes@gmail.com</a>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <span>© 2026 Kushagra Pandey</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
