"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One tiny observer drives every scroll animation; CSS does the moving.
 *   data-reveal / data-reveal-delay   fade + rise into view
 *   data-split / data-split-delay     heading wipes up out of a mask
 *   data-count="1000"                 number counts up
 *   data-draw / data-draw-delay       SVG stroke draws itself
 * No animation library ships to the browser; Lenis smooth scroll loads lazily on desktop only.
 */
const SELECTOR = "[data-reveal],[data-split],[data-count],[data-draw]";

function prepare(el: HTMLElement | SVGElement) {
  if (el.dataset.motion) return false;
  el.dataset.motion = "1";
  const delay = el.dataset.revealDelay ?? el.dataset.splitDelay ?? el.dataset.drawDelay;
  if (delay) el.style.transitionDelay = `${delay}s`;
  if (el.hasAttribute("data-draw") && el instanceof SVGGeometryElement) {
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
  }
  return true;
}

function play(el: HTMLElement | SVGElement) {
  el.classList.add("in");
  if (el.hasAttribute("data-draw")) (el as SVGElement).style.strokeDashoffset = "0";
  const target = Number(el.dataset.count);
  if (el.dataset.count && Number.isFinite(target)) {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1600);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString("en-IN");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

export function Motion() {
  const pathname = usePathname();

  // Smooth wheel scrolling on desktop only; phones keep native scrolling.
  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.12, anchors: { offset: -80 } });
      const loop = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("js");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          play(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const scan = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => prepare(el) && io.observe(el));
    scan();
    root.classList.add("motion");

    // Marquees stop animating while off-screen (saves battery and memory on phones).
    const mq = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("paused", !e.isIntersecting);
    });
    document.querySelectorAll(".marquee-wrap").forEach((el) => mq.observe(el));

    // Sections that load later (the map) get picked up too.
    let queued = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mq.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
