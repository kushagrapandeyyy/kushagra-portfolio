 "use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Approach", href: "#approach" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kushagra Pandey home">KP<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={14} /></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href="#contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={15} /></a>
      </nav>}
    </header>
  );
}
