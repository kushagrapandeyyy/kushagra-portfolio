import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className={`project-card project-${index + 1}`}>
      <Link href={`/projects/${project.slug}`} className="project-visual" aria-label={`Read ${project.title} case study`}>
        <div className={`project-art art-${index + 1}`}>
          <span className="art-label">{project.artLabel}</span>
          <span className="art-symbol">{project.symbol}</span>
          <span className="art-index">0{index + 1}</span>
        </div>
        <span className="project-open"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="project-info">
        <div><span className="project-type">{project.type}</span><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3></div>
        <p>{project.summary}</p>
        <div className="project-footer">
          <div className="project-tags">{project.stack.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="project-links">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}><ArrowUpRight size={16} /></a>}
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}><Github size={15} /></a>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
