const visiblePortion = .06;
const hoverRate = 1.18;

export function observeShowcaseFlow(section: HTMLElement, reduced: MediaQueryList) {
  if (typeof IntersectionObserver !== "function") return;

  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const visible = new Set<Element>();
  const syncCards = new Map<Element, () => void>();
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting, intersectionRatio } of entries) {
      if (isIntersecting && intersectionRatio >= visiblePortion) visible.add(target);
      else visible.delete(target);
      syncCards.get(target)?.();
    }
  }, { threshold: visiblePortion });

  section.querySelectorAll<SVGSVGElement>(".showcase-flow").forEach(overlay => {
    const card = overlay.closest("figure");
    const viewport = overlay.closest(".showcase-image");
    const image = viewport?.querySelector("img");
    if (!card || !viewport || !image) return;

    const packets = overlay.querySelectorAll<SVGGElement>(".showcase-packet");
    let hovered = false;

    function setSpeed() {
      const rate = hovered ? hoverRate : 1;
      packets.forEach(packet => {
        packet.getAnimations?.().forEach(animation => animation.updatePlaybackRate?.(rate));
      });
    }

    const sync = () => {
      const active = visible.has(viewport) && !document.hidden && !reduced.matches && image.complete && image.naturalWidth > 0;
      overlay.toggleAttribute("data-flow-active", active);
      if (active) setSpeed();
    };

    function updateHover(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      hovered = event.type === "pointerenter";
      overlay.toggleAttribute("data-flow-hovered", hovered);
      setSpeed();
    }

    card.addEventListener("pointerenter", updateHover, options);
    card.addEventListener("pointerleave", updateHover, options);
    image.addEventListener("load", sync, options);
    image.addEventListener("error", sync, options);
    syncCards.set(viewport, sync);
    observer.observe(viewport);
  });

  function syncAll() {
    syncCards.forEach(sync => sync());
  }

  reduced.addEventListener("change", syncAll, options);
  document.addEventListener("visibilitychange", syncAll, options);

  return () => {
    observer.disconnect();
    listeners.abort();
    visible.clear();
    syncAll();
    section.querySelectorAll(".showcase-flow[data-flow-hovered]").forEach(overlay => {
      overlay.removeAttribute("data-flow-hovered");
    });
  };
}
