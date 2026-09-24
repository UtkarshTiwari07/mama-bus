"use client";

import { useEffect, useRef, useState } from "react";
import { slides } from "@/content/heritage";
import { T } from "@/i18n/T";

const SRCSET = (src: string) => `${src}-1200.webp 1200w, ${src}-1920.webp 1920w`;

/**
 * Crossfading photo slideshow with a slow zoom. At most two images are in the
 * page at once (the one fading out and the one fading in), and the next photo
 * is preloaded quietly — light enough for low-memory phones.
 */
export function Slideshow({ interval = 5500, showCaption = true, className = "" }: { interval?: number; showCaption?: boolean; className?: string }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const current = useRef(0);

  const go = (next: number) => {
    setPrev(current.current);
    current.current = next;
    setIndex(next);
  };

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) go((current.current + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  // Preload the following photo at the size this screen will use.
  useEffect(() => {
    const next = slides[(index + 1) % slides.length].src;
    const img = new Image();
    img.sizes = "100vw";
    img.srcset = SRCSET(next);
  }, [index]);

  // Drop the outgoing photo once the fade has finished.
  useEffect(() => {
    if (prev === null) return;
    const id = setTimeout(() => setPrev(null), 1700);
    return () => clearTimeout(id);
  }, [prev]);

  const mounted = prev === null ? [index] : [prev, index];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {mounted.map((i) => {
        const s = slides[i];
        const incoming = i === index && prev !== null;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={`${s.src}-1920.webp`}
            srcSet={SRCSET(s.src)}
            sizes="100vw"
            alt=""
            decoding="async"
            fetchPriority={i === 0 && prev === null ? "high" : "auto"}
            className={`absolute inset-0 h-full w-full object-cover ${i === index ? "kenburns" : ""} ${incoming ? "slide-in" : ""}`}
          />
        );
      })}
      {showCaption && (
        <div className="absolute right-4 bottom-4 z-10 flex items-center gap-3 md:right-10 md:bottom-8">
          <p className="rounded-full bg-ink/60 px-4 py-2 text-sm text-ivory" aria-live="polite">
            <T b={slides[index].caption} />
          </p>
          <div className="hidden gap-1.5 md:flex">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => i !== index && go(i)}
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
