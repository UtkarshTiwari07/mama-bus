"use client";

import { useRef, useState } from "react";
import { services } from "@/content/services";
import { T } from "@/i18n/T";

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
    <section id="services" className="bg-ivory-2 px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4 text-sindoor"><T hi="हमारी सेवाएँ" en="Services" /></p>
            <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5rem]" data-split>
              <T hi="जैसा सफ़र, वैसी सेवा" en="However you travel" />
            </h2>
          </div>
          <p className="max-w-md text-lg text-ink/85 md:justify-self-end" data-reveal>
            <T
              hi="एक तरफ़ की टैक्सी, आना-जाना, एयरपोर्ट-स्टेशन, पूरा टूर पैकेज — अकेले, परिवार, ग्रुप या कंपनी के लिए।"
              en="One-way cabs, round-trip taxis, transfers, full tour packages — for individuals, families, groups and corporate travellers."
            />
          </p>
        </div>

        <div className="relative" onMouseMove={move} onMouseLeave={() => setActive(null)}>
          <div ref={preview} className={`pointer-events-none absolute top-0 left-0 z-20 hidden aspect-[4/5] w-64 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300 lg:block ${active === null ? "opacity-0" : "opacity-100"}`} aria-hidden="true">
            {services.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.title.en} src={s.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
            ))}
          </div>

          <ul className="grid gap-4 md:grid-cols-2 lg:block lg:border-t lg:border-ink/15">
            {services.map((s, i) => (
              <li
                key={s.title.en}
                onMouseEnter={() => setActive(i)}
                className="flex gap-4 overflow-hidden rounded-[1.5rem] bg-ivory lg:grid lg:grid-cols-[5rem_1.3fr_1.4fr] lg:items-center lg:rounded-none lg:border-b lg:border-ink/15 lg:bg-transparent lg:py-8"
                data-reveal
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" loading="lazy" className="h-auto w-28 shrink-0 object-cover lg:hidden" />
                <span className="hidden font-display text-lg text-ink/45 italic lg:block">{String(i + 1).padStart(2, "0")}</span>
                <div className="py-4 pr-4 lg:contents">
                  <h3 className={`text-2xl font-bold transition-all duration-500 ease-out-expo lg:font-display lg:text-5xl lg:font-normal ${active === i ? "lg:translate-x-3 lg:text-sindoor" : ""}`}>
                    <T b={s.title} />
                  </h3>
                  <p className="mt-1 text-ink/80 lg:mt-0 lg:text-lg"><T b={s.body} /></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
