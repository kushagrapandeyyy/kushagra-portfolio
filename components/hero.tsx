import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-pointer" data-pointer-light aria-hidden="true" />
      <div className="hero-word" aria-hidden="true"><span>SYSTEMS</span></div>
      <div className="hero-inner section-shell">
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/systems-core.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 72vw, 850px"
          />
          <div className="core-signals">
            <i className="signal signal-red" />
            <i className="signal signal-blue" />
            <i className="signal signal-out" />
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-person">
            <p className="hero-name"><span>Kushagra</span>{" "}<span>Pandey</span></p>
            <p className="hero-role">Software Engineer <span>|</span> Backend <span>|</span> AI <span>|</span> Systems</p>
          </div>
          <h1 className="hero-enter" id="hero-title">5 STACKS.<br /><span>ONE DEVELOPER.</span></h1>
          <p className="hero-copy hero-enter">
            I build intelligent systems, engineer scalable backends, strengthen application security and turn complex ideas into production-ready software.
          </p>
          <div className="hero-actions hero-enter">
            <a className="button button-primary" href="#domains">
              Explore my engineering <ArrowRight className="button-arrow" size={16} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contact">Get in touch</a>
          </div>
          <p className="hero-experience hero-enter"><span>≈ 2.4 years</span> of professional engineering experience</p>
        </div>
      </div>
    </section>
  );
}
