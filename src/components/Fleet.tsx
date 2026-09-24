"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fleet } from "@/content/fleet";
import { waLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { T } from "@/i18n/T";
import { PinIcon, Seats, SnowIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export function Fleet() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  // Desktop: pin the section and slide the cars sideways as you scroll.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-car]", el).forEach((car) => {
        gsap.fromTo(car, { scale: 1.12 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: car.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="fleet" ref={section} className="relative overflow-hidden bg-ivory py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div ref={track} className="flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pr-[10vw]">
        <div className="shrink-0 lg:w-[34vw]">
          <p className="eyebrow mb-5 text-sindoor"><T hi="हमारी गाड़ियाँ" en="The fleet" /></p>
          <h2 className="font-display text-[12vw] leading-[0.95] tracking-tight lg:text-[5vw]" data-split>
            <T hi="साफ़ गाड़ी, लंबे सफ़र के लिए तैयार।" en="Clean cars, ready for the long road." />
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/85" data-reveal>
            <T
              hi="हर सवारी से पहले गाड़ी साफ़ और सैनिटाइज़। रास्ते भर GPS। शहर के लिए 5 सीट, परिवार की यात्रा के लिए 7 सीट।"
              en="Every car is cleaned and sanitised before pickup and tracked by GPS on the way. A 5-seater for the city, a 7-seater for the family yatra."
            />
          </p>
          <ul className="mt-8 flex flex-wrap gap-2 font-semibold text-ink/85" data-reveal>
            <li className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2"><SnowIcon /> AC</li>
            <li className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2"><PinIcon /> GPS</li>
            <li className="rounded-full border-2 border-ink/15 px-4 py-2"><T hi="साफ़-सुथरी" en="Sanitised" /></li>
            <li className="rounded-full border-2 border-ink/15 px-4 py-2">24×7</li>
          </ul>
        </div>

        {fleet.map((car, i) => (
          <article key={car.key} className="relative shrink-0 lg:w-[58vw]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ivory-2 lg:aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-car src={`${car.image}.webp`} srcSet={`${car.image}-1200.webp 1200w, ${car.image}.webp 2000w`} sizes="(min-width: 1024px) 58vw, 100vw" alt={`${car.model.en} — ${car.seats} seater`} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
              <span className="eyebrow absolute top-5 left-5 rounded-full bg-ivory/85 px-4 py-2 text-ink backdrop-blur">
                0{i + 1} / 0{fleet.length}
              </span>
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4 text-ivory md:inset-x-8 md:bottom-8">
                <div>
                  <p className="flex items-center gap-2 text-ivory/90"><Seats n={car.seats} /> {car.seats} <T hi="सीट" en="seats" /></p>
                  <h3 className="font-sans text-5xl font-extrabold tracking-[-0.04em] md:text-8xl"><T b={car.name} /></h3>
                  <p className="text-ivory/85"><T b={car.model} /></p>
                </div>
                <a
                  href={waLink(lang === "hi" ? `नमस्ते, मुझे ${car.model.hi} (${car.seats} सीट) बुक करनी है।` : `Hello, I want to book the ${car.model.en} (${car.seats} seater).`)}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-ivory px-6 py-3.5 font-bold text-ink transition-colors hover:bg-sindoor hover:text-ivory"
                >
                  <T hi={`${car.name.hi} बुक करें`} en={`Book the ${car.name.en}`} />
                </a>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-ink/15 pt-5 text-sm">
              <div><dt className="eyebrow text-ink/55"><T hi="सीट" en="Seats" /></dt><dd className="mt-1 font-display text-2xl">{car.seats}</dd></div>
              <div><dt className="eyebrow text-ink/55"><T hi="गाड़ी" en="Type" /></dt><dd className="mt-1 font-display text-2xl"><T b={car.type} /></dd></div>
              <div><dt className="eyebrow text-ink/55"><T hi="किसके लिए" en="Ideal for" /></dt><dd className="mt-1 text-ink/85"><T b={car.idealFor} /></dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
