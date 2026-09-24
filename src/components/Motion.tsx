"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/LangProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/**
 * One client component drives every scroll animation on the site, so page
 * sections can stay server components and opt in with data attributes:
 *   data-reveal           fade + rise when scrolled into view
 *   data-split            heading split into lines that rise out of a mask
 *   data-scrub-words      words light up one by one as you scroll
 *   data-count="1000"     number counts up
 *   data-draw             SVG strokes draw themselves
 *   data-parallax="0.15"  drifts against the scroll
 */
export function Motion() {
  const pathname = usePathname();
  const { lang } = useLang();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.documentElement.classList.remove("js");
      return;
    }
    lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          delay: Number(el.dataset.splitDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 45%", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IN");
          },
        });
      });

      gsap.utils.toArray<SVGGeometryElement>("[data-draw]").forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            delay: Number(path.dataset.drawDelay ?? 0),
            scrollTrigger: { trigger: path.ownerSVGElement ?? path, start: "top 75%", once: true },
            onComplete: () => {
              path.style.strokeDasharray = "";
              path.style.strokeDashoffset = "";
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax);
        gsap.to(el, {
          yPercent: amount * 100,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    });

    document.documentElement.classList.add("motion");
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [pathname, lang]);

  return null;
}
