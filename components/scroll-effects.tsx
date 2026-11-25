"use client";

import { useEffect, useRef } from "react";

const revealDelay = 62;
const countDuration = 760;

export function ScrollEffects({ onSectionChange }: { onSectionChange: (id: string) => void }) {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progress.current;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const hero = document.getElementById("top");
    const showcase = document.getElementById("showcase");
    const pointer = hero?.querySelector<HTMLElement>("[data-pointer-light]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 881px)");
    const fineMotion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const entering = new Set<HTMLElement>();
    const counters = new Map<HTMLElement, { target: number; startsAt: number }>();
    let scrollFrame = 0;
    let countFrame = 0;
    let pointerFrame = 0;
    let activeSection = "";
    let sectionOffsets: number[] = [];
    let maxScroll = 0;
    let heroEnd = 0;
    let heroTop = 0;
    let heroLeft = 0;
    let showcaseTop = 0;
    let showcaseHeight = 0;
    let pointerX = 0;
    let pointerY = 0;

    function updateScroll() {
      scrollFrame = 0;
      const y = Math.max(0, window.scrollY);
      const viewport = window.innerHeight;
      const currentProgress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
      bar?.style.setProperty("--progress", String(currentProgress));

      const readingLine = y + Math.min(230, viewport * .27);
      let index = sections.length - 1;
      if (currentProgress < .998) {
        while (index > 0 && sectionOffsets[index] > readingLine) index--;
      }
      const id = sections[index]?.id;
      if (id && id !== activeSection) {
        activeSection = id;
        onSectionChange(id);
      }

      if (reduced.matches || !wide.matches) return;
      if (y < heroEnd) {
        const shift = Math.min(y, 540);
        hero?.style.setProperty("--hero-shift", shift * .085 + "px");
        hero?.style.setProperty("--word-shift", shift * -.075 + "px");
      }
      if (y + viewport > showcaseTop && y < showcaseTop + showcaseHeight) {
        const offset = (y + viewport / 2 - showcaseTop - showcaseHeight / 2) * .022;
        showcase?.style.setProperty("--showcase-shift", Math.max(-6, Math.min(6, offset)) + "px");
      }
    }

    function queueScroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    }

    function measure() {
      const y = window.scrollY;
      sectionOffsets = sections.map(section => section.getBoundingClientRect().top + y);
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      const heroRect = hero?.getBoundingClientRect();
      heroTop = (heroRect?.top ?? 0) + y;
      heroLeft = heroRect?.left ?? 0;
      heroEnd = (heroRect?.bottom ?? 0) + y;

      const showcaseRect = showcase?.getBoundingClientRect();
      showcaseTop = (showcaseRect?.top ?? 0) + y;
      showcaseHeight = showcaseRect?.height ?? 0;
      queueScroll();
    }

    function updateCounts(now: number) {
      countFrame = 0;
      for (const [element, { target, startsAt }] of counters) {
        const elapsed = Math.min(1, Math.max(0, (now - startsAt) / countDuration));
        const value = Math.round(target * (1 - (1 - elapsed) ** 3));
        if (element.textContent !== String(value)) element.textContent = String(value);
        if (elapsed === 1) counters.delete(element);
      }
      if (counters.size) countFrame = requestAnimationFrame(updateCounts);
    }

    function startCount(metric: HTMLElement, delay: number) {
      const value = metric.querySelector<HTMLElement>("[data-count]");
      if (!value) return;

      value.textContent = "0";
      counters.set(value, { target: Number(value.dataset.count), startsAt: performance.now() + delay });
      if (!countFrame) countFrame = requestAnimationFrame(updateCounts);
    }

    function finishReveal(element: HTMLElement) {
      entering.delete(element);
      element.dataset.reveal = "done";
    }

    function onAnimationEnd(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      if (event.animationName === "section-rise" && entering.has(element)) finishReveal(element);
      if (event.animationName === "run-signal" && element.classList.contains("showcase-flow")) {
        element.closest("[data-flow]")?.removeAttribute("data-flow");
      }
    }

    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
      const groups = new Map<Element | null, number>();
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer?.unobserve(element);
        if (reduced.matches) continue;

        const parent = element.parentElement;
        const index = groups.get(parent) ?? 0;
        groups.set(parent, index + 1);
        const delay = Math.min(index, 5) * revealDelay;
        element.style.setProperty("--enter-delay", delay + "ms");
        element.dataset.reveal = "entering";
        entering.add(element);
        if (element.classList.contains("metric")) startCount(element, delay);
        if (element.classList.contains("showcase-item")) element.setAttribute("data-flow", "");
      }
    }, { threshold: .12 }) : null;

    function resetMotion() {
      for (const element of entering) finishReveal(element);
      cancelAnimationFrame(countFrame);
      countFrame = 0;
      for (const [element, { target }] of counters) element.textContent = String(target);
      counters.clear();
      showcase?.querySelectorAll("[data-flow]").forEach(item => item.removeAttribute("data-flow"));
      hero?.style.removeProperty("--hero-shift");
      hero?.style.removeProperty("--word-shift");
      showcase?.style.removeProperty("--showcase-shift");
      queueScroll();
    }

    function updatePointer() {
      pointerFrame = 0;
      pointer?.style.setProperty("transform", "translate3d(" + pointerX + "px," + pointerY + "px,0)");
      pointer?.setAttribute("data-lit", "");
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX - heroLeft;
      pointerY = event.pageY - heroTop;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
    }

    function hidePointer() {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      pointer?.removeAttribute("data-lit");
    }

    function syncPointer() {
      hero?.removeEventListener("pointermove", movePointer);
      if (fineMotion.matches) hero?.addEventListener("pointermove", movePointer, { passive: true });
      else hidePointer();
    }

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
      if (element.dataset.reveal !== "done") observer?.observe(element);
    });
    const resize = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    resize?.observe(document.body);
    document.addEventListener("animationend", onAnimationEnd);
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", resetMotion);
    wide.addEventListener("change", resetMotion);
    fineMotion.addEventListener("change", syncPointer);
    hero?.addEventListener("pointerleave", hidePointer);
    measure();
    syncPointer();

    return () => {
      observer?.disconnect();
      resize?.disconnect();
      document.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", resetMotion);
      wide.removeEventListener("change", resetMotion);
      fineMotion.removeEventListener("change", syncPointer);
      hero?.removeEventListener("pointermove", movePointer);
      hero?.removeEventListener("pointerleave", hidePointer);
      hidePointer();
      resetMotion();
      cancelAnimationFrame(scrollFrame);
    };
  }, [onSectionChange]);

  return <div className="scroll-progress" ref={progress} aria-hidden="true" />;
}
