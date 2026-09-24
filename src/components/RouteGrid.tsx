"use client";

import Link from "next/link";
import { useState } from "react";
import { cities, inr, routes, type Route } from "@/content/routes";
import { waLink } from "@/lib/whatsapp";

export function RouteGrid({ heading = true, list = routes }: { heading?: boolean; list?: Route[] }) {
  const [size, setSize] = useState<"small" | "large">("small");

  return (
    <section id="routes" className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {heading ? (
            <div>
              <p className="eyebrow mb-5 text-sindoor">Fixed fares · <span className="hindi text-[0.95rem]">किराया</span></p>
              <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5.5rem]" data-split>
                Our most-booked <em>routes</em>
              </h2>
            </div>
          ) : <div />}
          <div className="flex items-center gap-4">
            <span className="eyebrow text-ink/50">Show fares for</span>
            <div className="flex rounded-full border border-ink/15 p-1" role="radiogroup" aria-label="Car size">
              {(["small", "large"] as const).map((s) => (
                <button key={s} type="button" role="radio" aria-checked={size === s} onClick={() => setSize(s)} className={`eyebrow rounded-full px-5 py-2.5 transition-colors ${size === s ? "bg-ink text-ivory" : "text-ink/70 hover:text-ink"}`}>
                  {s === "small" ? "5 seater" : "7 seater"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ol className="border-t border-ink/15">
          {list.map((r, i) => {
            const fare = r[size];
            return (
              <li key={r.slug} className="group relative border-b border-ink/15" data-reveal>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-y-100" aria-hidden="true" />
                <div className="relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-5 transition-colors duration-500 group-hover:text-ivory md:grid-cols-[4rem_1.3fr_1fr_auto_auto] md:py-7">
                  <span className="text-sm text-ink/40 tabular-nums transition-colors group-hover:text-ivory/50">{String(i + 1).padStart(2, "0")}</span>
                  <Link href={`/routes/${r.slug}/`} className="font-display text-2xl leading-tight md:text-4xl">
                    {cities[r.from].name} <span className="text-sindoor transition-colors group-hover:text-turmeric">→</span> {cities[r.to].name}
                    <span className="absolute inset-0" aria-hidden="true" />
                  </Link>
                  <span className="hindi col-start-2 row-start-2 text-sm text-ink/50 transition-colors group-hover:text-ivory/60 md:col-start-auto md:row-start-auto md:text-lg">
                    {cities[r.from].hi} से {cities[r.to].hi}
                  </span>
                  <span className="col-start-3 row-span-2 row-start-1 text-right md:col-start-auto md:row-span-1 md:row-start-auto">
                    <span className="eyebrow block text-[0.62rem] text-ink/45 group-hover:text-ivory/50">{fare.seats} seater</span>
                    <span className="font-display text-2xl tabular-nums md:text-4xl">{inr(fare.fare)}</span>
                  </span>
                  <a
                    href={waLink(`Hello, I want to book a ${fare.seats} seater from ${cities[r.from].name} to ${cities[r.to].name} (${inr(fare.fare)}).`)}
                    target="_blank"
                    rel="noopener"
                    className="eyebrow relative z-10 hidden rounded-full border border-current px-5 py-3 transition-colors hover:border-sindoor hover:bg-sindoor md:inline-block"
                  >
                    Book
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-sm text-ink/55">One-way and round-trip available on every route. Don&apos;t see yours?{" "}
          <Link href="/#map" className="underline decoration-sindoor underline-offset-4 hover:text-ink">Pick any two places on the map</Link> for a quote.
        </p>
      </div>
    </section>
  );
}
