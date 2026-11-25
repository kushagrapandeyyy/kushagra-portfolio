const duration = 670;
const visibilityThreshold = .18;

export function observeMetricCounts(reduced: MediaQueryList, headerHeight: number) {
  const metrics = new Map<HTMLElement, { ticker: HTMLElement; final: string; target: number }>();
  const active = new Map<HTMLElement, number>();
  let frame = 0;

  document.querySelectorAll<HTMLElement>(".metric").forEach(card => {
    const final = card.querySelector<HTMLElement>("[data-count]")?.dataset.count;
    const ticker = card.querySelector<HTMLElement>(".metric-ticker");
    if (final && ticker) metrics.set(card, { ticker, final, target: Number(final) });
  });

  function finish(card: HTMLElement, animated: boolean) {
    card.dataset.countState = animated ? "complete" : "settled";
  }

  if (reduced.matches || typeof IntersectionObserver !== "function") {
    for (const card of metrics.keys()) finish(card, false);
    return;
  }

  function update(now: number) {
    frame = 0;
    for (const [card, start] of active) {
      const metric = metrics.get(card);
      if (!metric) continue;

      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - (1 - progress) ** 3;
      const value = progress === 1 ? metric.final : String(Math.round(metric.target * eased));
      if (metric.ticker.dataset.value !== value) metric.ticker.dataset.value = value;
      if (progress === 1) {
        active.delete(card);
        finish(card, true);
      }
    }
    if (active.size) frame = requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    if (reduced.matches) return;
    for (const { target, isIntersecting, intersectionRatio } of entries) {
      if (!isIntersecting || intersectionRatio < visibilityThreshold) continue;

      const card = target as HTMLElement;
      observer.unobserve(card);
      if (card.dataset.countState !== "pending") continue;

      card.dataset.countState = "running";
      active.set(card, performance.now());
    }
    if (active.size && !frame) frame = requestAnimationFrame(update);
  }, { threshold: visibilityThreshold, rootMargin: `-${headerHeight}px 0px 0px` });

  for (const card of metrics.keys()) {
    if (card.dataset.countState && card.dataset.countState !== "pending") continue;
    card.dataset.countState = "pending";
    observer.observe(card);
  }

  function stop() {
    observer.disconnect();
    cancelAnimationFrame(frame);
    frame = 0;
    active.clear();
  }

  function settleForReducedMotion() {
    if (!reduced.matches) return;
    stop();
    for (const card of metrics.keys()) finish(card, false);
  }

  reduced.addEventListener("change", settleForReducedMotion);
  return () => {
    reduced.removeEventListener("change", settleForReducedMotion);
    for (const card of active.keys()) finish(card, false);
    stop();
  };
}
