"use client";

import { useEffect, useRef } from "react";
import { observeMetricCounts } from "@/components/metric-counts";
import { observeShowcaseFlow } from "@/components/showcase-flow-motion";

const revealDelay = 48;
const revealThreshold = .08;

export function ScrollEffects({ onSectionChange }: { onSectionChange: (id: string) => void }) {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progress.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const hero = document.getElementById("top");
    const showcase = document.getElementById("showcase");
    const pointer = hero?.querySelector<HTMLElement>("[data-pointer-light]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMotion = window.matchMedia("(min-width: 881px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let scrollFrame = 0;
    let pointerFrame = 0;
    let activeSection = "";
    let sectionOffsets: number[] = [];
    let maxScroll = 0;
    let headerHeight = 0;
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

      const readingLine = y + Math.min(headerHeight + 58, viewport * .4);
      let index = sections.length - 1;
      if (currentProgress < .998) {
        while (index > 0 && sectionOffsets[index] > readingLine) index--;
      }
      const id = sections[index]?.id;
      if (id && id !== activeSection) {
        activeSection = id;
        onSectionChange(id);
      }

      if (!fineMotion.matches) return;
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
      headerHeight = header?.offsetHeight ?? 0;

      const heroRect = hero?.getBoundingClientRect();
      heroTop = (heroRect?.top ?? 0) + y;
      heroLeft = heroRect?.left ?? 0;
      heroEnd = (heroRect?.bottom ?? 0) + y;

      const showcaseRect = showcase?.getBoundingClientRect();
      showcaseTop = (showcaseRect?.top ?? 0) + y;
      showcaseHeight = showcaseRect?.height ?? 0;
      queueScroll();
    }

    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
      const groups = new Map<Element | null, number>();
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < revealThreshold) continue;
        const element = entry.target as HTMLElement;
        observer?.unobserve(element);
        if (element.dataset.reveal) continue;
        if (reduced.matches) {
          element.dataset.reveal = "done";
          continue;
        }

        const parent = element.parentElement;
        const index = groups.get(parent) ?? 0;
        groups.set(parent, index + 1);
        element.style.setProperty("--enter-delay", Math.min(index, 4) * revealDelay + "ms");
        element.dataset.reveal = "played";
      }
    }, { threshold: revealThreshold }) : null;

    function settleReveals() {
      if (!reduced.matches) return;
      document.querySelectorAll<HTMLElement>('[data-reveal="played"]').forEach(element => {
        element.dataset.reveal = "done";
      });
    }

    function clearParallax() {
      hero?.style.removeProperty("--hero-shift");
      hero?.style.removeProperty("--word-shift");
      showcase?.style.removeProperty("--showcase-shift");
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
      else {
        hidePointer();
        clearParallax();
      }
      queueScroll();
    }

    measure();
    const stopCounts = observeMetricCounts(reduced, headerHeight);
    const stopFlow = showcase && observeShowcaseFlow(showcase, reduced);
    document.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach(element => observer?.observe(element));
    const resize = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    resize?.observe(document.body);
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", settleReveals);
    fineMotion.addEventListener("change", syncPointer);
    hero?.addEventListener("pointerleave", hidePointer);
    syncPointer();

    return () => {
      stopCounts?.();
      stopFlow?.();
      observer?.disconnect();
      resize?.disconnect();
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", settleReveals);
      fineMotion.removeEventListener("change", syncPointer);
      hero?.removeEventListener("pointermove", movePointer);
      hero?.removeEventListener("pointerleave", hidePointer);
      hidePointer();
      clearParallax();
      cancelAnimationFrame(scrollFrame);
    };
  }, [onSectionChange]);

  return <div className="scroll-progress" ref={progress} aria-hidden="true" />;
}
