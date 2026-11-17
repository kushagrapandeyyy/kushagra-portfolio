import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, getProject } from "@/lib/data";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Navigation />
      <main className="case-study section-shell">
        <Link className="back-link" href="/#work"><ArrowLeft size={15} /> Back to selected work</Link>
        <Reveal>
          <span className="section-kicker">{project.type}</span>
          <h1 className="case-title">{project.title}<span>.</span></h1>
          <p className="case-lede">{project.description}</p>
          <div className="case-art"><span>{project.artLabel}</span><strong>{project.symbol}</strong></div>
        </Reveal>
        <div className="case-content">
          <Reveal><span className="section-kicker">THE PROBLEM</span><h2>Why it exists.</h2><p>{project.problem}</p></Reveal>
          <Reveal><span className="section-kicker">THE APPROACH</span><h2>How I approached it.</h2><ul>{project.approach.map(item => <li key={item}>{item}</li>)}</ul></Reveal>
          <Reveal><span className="section-kicker">TECHNOLOGY</span><h2>Built with.</h2><div className="skill-tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></Reveal>
          <Reveal className="case-note"><span className="section-kicker">PROJECT NOTE</span><p>{project.notes}</p></Reveal>
        </div>
        <div className="case-actions">
          {project.live && <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">Visit live project <ArrowUpRight size={15} /></a>}
          <Link className="button button-quiet" href="/#work">Explore other projects <ArrowLeft size={15} /></Link>
        </div>
      </main>
    </>
  );
}
