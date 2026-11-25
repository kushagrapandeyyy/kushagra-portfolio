"use client";

import { useEffect, useRef } from "react";

const trailMotion = "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";
const particleLimit = 40;
const particleSpacing = 9;
const spriteSize = 40;

function makeGlow(sparkle: boolean) {
  const sprite = document.createElement("canvas");
  sprite.width = spriteSize;
  sprite.height = spriteSize;
  const context = sprite.getContext("2d");
  if (!context) return sprite;

  const center = spriteSize / 2;
  const glow = context.createRadialGradient(center, center, 0, center, center, center);
  glow.addColorStop(0, "#effdff");
  glow.addColorStop(.22, "#9beeff");
  glow.addColorStop(.42, "#32b8fff2");
  glow.addColorStop(.66, "#1978ff80");
  glow.addColorStop(1, "#176bff00");
  context.fillStyle = glow;
  context.fillRect(0, 0, spriteSize, spriteSize);

  if (sparkle) {
    context.fillStyle = "#a9efffe0";
    context.beginPath();
    context.moveTo(center, 7);
    context.lineTo(center + 2, center - 2);
    context.lineTo(center + 9, center);
    context.lineTo(center + 2, center + 2);
    context.lineTo(center, spriteSize - 7);
    context.lineTo(center - 2, center + 2);
    context.lineTo(center - 9, center);
    context.lineTo(center - 2, center - 2);
    context.closePath();
    context.fill();
  }

  return sprite;
}

function attachTrail(canvas: HTMLCanvasElement, hero: HTMLElement) {
  const drawingContext = canvas.getContext("2d");
  if (!drawingContext) return;
  const context = drawingContext;

  const glow = makeGlow(false);
  const sparkle = makeGlow(true);
  const particles = Array.from({ length: particleLimit }, () => ({
    x: 0, y: 0, driftX: 0, driftY: 0, born: 0, lifetime: 0, radius: 0, alpha: 0, sprite: glow,
  }));
  let nextParticle = 0;
  let bounds: DOMRect | undefined;
  let frame = 0;
  let lastFrame = 0;
  let lastSparkle = -Infinity;
  let spacingRemainder = 0;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  function clearFrame() {
    if (right > left) context.clearRect(left - 1, top - 1, right - left + 2, bottom - top + 2);
    left = top = Infinity;
    right = bottom = -Infinity;
  }

  function emit(atX: number, atY: number, now: number, isSparkle: boolean) {
    const particle = particles[nextParticle];
    nextParticle = (nextParticle + 1) % particleLimit;
    particle.x = atX + (Math.random() - .5) * 2;
    particle.y = atY + (Math.random() - .5) * 2;
    particle.driftX = (Math.random() - .5) * 7;
    particle.driftY = (Math.random() - .5) * 7;
    particle.born = now;
    particle.lifetime = (isSparkle ? 240 : 360) + Math.random() * 100;
    particle.radius = (isSparkle ? 6.5 : 4.5) + Math.random() * 1.7;
    particle.alpha = isSparkle ? .94 : .86;
    particle.sprite = isSparkle ? sparkle : glow;
  }

  function draw(now: number) {
    const elapsed = Math.min(32, Math.max(1, now - lastFrame));
    lastFrame = now;
    const distanceToTarget = Math.hypot(targetX - x, targetY - y);
    const follow = distanceToTarget <= 1 ? 1 : 1 - Math.exp(-elapsed / 13);
    const dx = (targetX - x) * follow;
    const dy = (targetY - y) * follow;
    const distance = Math.hypot(dx, dy);
    // Keep spacing even when several pointer events arrive between frames.
    const spacing = Math.max(particleSpacing, (spacingRemainder + distance) / 3);
    let nextStep = spacing - spacingRemainder;
    while (distance > 0 && nextStep <= distance) {
      const fast = distance / elapsed > .95 && now - lastSparkle > 125;
      emit(x + dx * nextStep / distance, y + dy * nextStep / distance, now, fast);
      if (fast) lastSparkle = now;
      nextStep += spacing;
    }
    spacingRemainder = distance - nextStep + spacing;
    x = follow === 1 ? targetX : x + dx;
    y = follow === 1 ? targetY : y + dy;

    clearFrame();
    let alive = false;
    for (const particle of particles) {
      const age = now - particle.born;
      if (age >= particle.lifetime) continue;

      const progress = Math.max(0, age / particle.lifetime);
      const radius = particle.radius * (1 - .62 * progress);
      const drawX = particle.x + particle.driftX * progress - radius;
      const drawY = particle.y + particle.driftY * progress - radius;
      context.globalAlpha = particle.alpha * (1 - progress ** 1.6);
      context.drawImage(particle.sprite, drawX, drawY, radius * 2, radius * 2);
      left = Math.min(left, drawX);
      top = Math.min(top, drawY);
      right = Math.max(right, drawX + radius * 2);
      bottom = Math.max(bottom, drawY + radius * 2);
      alive = true;
    }

    frame = alive || x !== targetX || y !== targetY ? requestAnimationFrame(draw) : 0;
  }

  function move(event: PointerEvent) {
    if (event.pointerType !== "mouse") {
      clearTrail();
      return;
    }

    if (!bounds) {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(1_600_000 / (rect.width * rect.height)));
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      bounds = rect;
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
    }

    targetX = event.clientX - bounds.left;
    targetY = event.clientY - bounds.top;
    if (!frame) {
      lastFrame = performance.now();
      emit(x, y, lastFrame, false);
      frame = requestAnimationFrame(draw);
    }
  }

  function clearTrail() {
    if (!bounds) return;

    cancelAnimationFrame(frame);
    frame = 0;
    clearFrame();
    for (const particle of particles) particle.lifetime = 0;
    bounds = undefined;
    spacingRemainder = 0;
    lastSparkle = -Infinity;
  }

  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", clearTrail);
  hero.addEventListener("pointercancel", clearTrail);
  window.addEventListener("scroll", clearTrail, { passive: true });
  window.addEventListener("resize", clearTrail);
  window.addEventListener("blur", clearTrail);
  document.addEventListener("visibilitychange", clearTrail);

  return () => {
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", clearTrail);
    hero.removeEventListener("pointercancel", clearTrail);
    window.removeEventListener("scroll", clearTrail);
    window.removeEventListener("resize", clearTrail);
    window.removeEventListener("blur", clearTrail);
    document.removeEventListener("visibilitychange", clearTrail);
    clearTrail();
    canvas.width = 0;
    canvas.height = 0;
  };
}

export function HeroCursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    if (!canvas || !hero) return;

    const motion = window.matchMedia(trailMotion);
    const start = () => motion.matches ? attachTrail(canvas, hero) : undefined;
    let detach = start();
    function sync() {
      detach?.();
      detach = start();
    }

    motion.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      detach?.();
    };
  }, []);

  return <canvas ref={ref} className="hero-cursor-trail" width={0} height={0} aria-hidden="true" />;
}
