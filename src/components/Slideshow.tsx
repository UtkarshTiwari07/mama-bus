"use client";

import { useEffect, useState } from "react";
import { slides } from "@/content/heritage";
import { T } from "@/i18n/T";

/** Crossfading photo slideshow with a slow Ken Burns zoom. Static under reduced motion. */
export function Slideshow({ interval = 5500, showCaption = true, className = "" }: { interval?: number; showCaption?: boolean; className?: string }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(-1);
  const go = (next: number) => {
    setIndex((cur) => {
      setPrev(cur);
      return next;
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((cur) => {
        setPrev(cur);
        return (cur + 1) % slides.length;
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {slides.map((s, i) => {
        const active = i === index;
        // The outgoing slide keeps its zoom while it fades, so nothing jumps.
        const zoom = active || i === prev;
        // Only the current and next slide need to be loaded eagerly.
        const near = i === index || i === (index + 1) % slides.length;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={`${s.src}.webp`}
            srcSet={`${s.src}-1200.webp 1200w, ${s.src}.webp 2400w`}
            sizes="100vw"
            alt=""
            loading={i === 0 || near ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${zoom ? "kenburns" : ""} ${active ? "opacity-100" : "opacity-0"}`}
          />
        );
      })}
      {showCaption && (
        <div className="absolute right-4 bottom-4 z-10 flex items-center gap-3 md:right-10 md:bottom-8">
          <p className="rounded-full bg-ink/45 px-4 py-2 text-sm text-ivory backdrop-blur" aria-live="polite">
            <T b={slides[index].caption} />
          </p>
          <div className="hidden gap-1.5 md:flex">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${slides.length}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-ivory" : "w-3 bg-ivory/45 hover:bg-ivory/70"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
