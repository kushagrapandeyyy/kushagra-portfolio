"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ScrollEffects } from "@/components/scroll-effects";

const links = [
  { label: "Impact", href: "#impact" },
  { label: "Domains", href: "#domains" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Showcase", href: "#showcase" },
  { label: "Experience", href: "#experience" },
  { label: "Approach", href: "#approach" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("top");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const current = (href: string) => href === "#" + activeSection ? "location" : undefined;

  return (
    <>
      <ScrollEffects onSectionChange={setActiveSection} />
      <header className="site-header" onKeyDown={event => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}>
        <div className="header-inner section-shell">
          <a className="brand" href="#top" aria-current={current("#top")} aria-label="Kushagra Pandey home" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">KP</span>
            <span>Kushagra Pandey</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(link => <a key={link.href} href={link.href} aria-current={current(link.href)}>{link.label}</a>)}
          </nav>
          <a className="nav-contact button button-quiet" href="#contact" aria-current={current("#contact")}>Let’s talk</a>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(value => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
            {links.map(link => <a key={link.href} href={link.href} aria-current={current(link.href)} onClick={() => setOpen(false)}>{link.label}</a>)}
            <a href="#contact" aria-current={current("#contact")} onClick={() => setOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}
