"use client";

import { useRef, useState } from "react";
import { services } from "@/content/services";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = preview.current;
    if (!el) return;
    const box = el.parentElement!.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - box.left}px, ${e.clientY - box.top}px, 0) translate(-50%, -50%)`;
  };

  return (
    <section id="services" className="bg-ivory-2 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-5 text-sindoor">Services · <span className="hindi text-[0.95rem]">सेवाएँ</span></p>
            <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5.5rem]" data-split>
              However you <em>travel</em>
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink/70 md:justify-self-end" data-reveal>
            One-way cabs, round-trip taxis, transfers, full tour packages — for individuals, families, groups and corporate travellers.
          </p>
        </div>

        <div className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
          <div
            ref={preview}
            className={`pointer-events-none absolute top-0 left-0 z-20 hidden aspect-[4/5] w-64 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300 lg:block ${active === null ? "opacity-0" : "opacity-100"}`}
            aria-hidden="true"
          >
            {services.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.title} src={s.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
            ))}
          </div>

          <ul className="border-t border-ink/15">
            {services.map((s, i) => (
              <li
                key={s.title}
                onMouseEnter={() => setActive(i)}
                className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-2 border-b border-ink/15 py-7 md:grid-cols-[5rem_1.2fr_1fr_1fr] md:items-center md:py-9"
                data-reveal
              >
                <span className="font-display text-lg text-ink/40 italic">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`font-display text-3xl transition-all duration-500 ease-out-expo md:text-5xl ${active === i ? "translate-x-3 italic text-sindoor" : ""}`}>{s.title}</h3>
                <span className="hindi col-start-2 text-xl text-terracotta md:col-start-auto">{s.hi}</span>
                <p className="col-start-2 text-ink/70 md:col-start-auto">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
