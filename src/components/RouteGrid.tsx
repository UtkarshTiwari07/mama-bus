"use client";

import Link from "next/link";
import { useState } from "react";
import { cities, inr, routes, type Route } from "@/content/routes";
import { waLink } from "@/lib/whatsapp";
import { useLinkCooldown } from "@/lib/throttle";
import { useLang } from "@/i18n/LangProvider";
import { T } from "@/i18n/T";
import { SearchIcon, Seats } from "./Icons";

/**
 * Editorial route rows: big serif names, hairline dividers, and an ink fill that
 * wipes up from the bottom on hover / focus / tap. Both fares sit on every row.
 */
export function RouteGrid({ heading = true, list = routes, search = true }: { heading?: boolean; list?: Route[]; search?: boolean }) {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const guard = useLinkCooldown();
  const needle = q.trim().toLowerCase();
  const shown = needle
    ? list.filter((r) => [r.from, r.to].some((c) => cities[c].name.toLowerCase().includes(needle) || cities[c].hi.includes(q.trim())))
    : list;

  return (
    <section id="routes" className="px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {heading ? (
            <div>
              <p className="eyebrow mb-4 text-sindoor"><T hi="तय किराया" en="Fixed fares" /></p>
              <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5.2rem]" data-split>
                <T hi="सबसे ज़्यादा बुक होने वाले रूट" en="Our most-booked routes" />
              </h2>
            </div>
          ) : <div />}
          {search && (
            <label className="flex w-full items-center gap-3 rounded-full border-2 border-ink/15 bg-white px-5 py-3.5 focus-within:border-sindoor md:w-96">
              <SearchIcon className="size-6 text-ink/60" />
              <span className="sr-only"><T hi="अपना शहर खोजें" en="Search your city" /></span>
              <input
                type="search"
                value={q}
                maxLength={40}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "hi" ? "अपना शहर खोजें — जैसे गया" : "Search your city — e.g. Gaya"}
                className="w-full bg-transparent text-lg outline-none placeholder:text-ink/45"
              />
            </label>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="rounded-2xl bg-ivory-2 p-6 text-lg" data-empty>
            <T hi="यह शहर लिस्ट में नहीं है — पर हम वहाँ भी जाते हैं! " en="That city isn't listed — but we go there too! " />
            <a href={waLink(lang === "hi" ? `नमस्ते, मुझे ${q} के लिए गाड़ी चाहिए।` : `Hello, I need a cab for ${q}.`)} target="_blank" rel="noopener noreferrer" className="font-bold text-sindoor underline underline-offset-4">
              <T hi="WhatsApp पर किराया पूछें" en="Ask the fare on WhatsApp" />
            </a>
          </p>
        ) : (
          <ol className="border-t border-ink/15">
            {shown.map((r, i) => {
              const f = cities[r.from];
              const t = cities[r.to];
              const msg = (seats: number, fare: number) =>
                lang === "hi"
                  ? `नमस्ते, मुझे ${f.hi} से ${t.hi} के लिए ${seats} सीट वाली गाड़ी बुक करनी है (${inr(fare)}).`
                  : `Hello, I want to book a ${seats} seater from ${f.name} to ${t.name} (${inr(fare)}).`;
              return (
                <li key={r.slug} className="group relative border-b border-ink/15" data-reveal>
                  {/* The ink wipe */}
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out-expo group-focus-within:scale-y-100 group-hover:scale-y-100 group-active:scale-y-100" aria-hidden="true" />
                  <div className="relative grid grid-cols-[2.2rem_1fr] items-center gap-x-4 gap-y-3 py-6 transition-colors duration-500 group-focus-within:text-ivory group-hover:text-ivory group-active:text-ivory md:grid-cols-[3.5rem_1.5fr_1fr_auto] md:py-8 lg:grid-cols-[3.5rem_1.4fr_0.9fr_auto_auto]">
                    <span className="text-sm text-ink/45 tabular-nums transition-colors group-hover:text-ivory/50">{String(i + 1).padStart(2, "0")}</span>
                    <Link href={`/routes/${r.slug}/`} className="font-display text-3xl leading-tight md:text-[2.6rem]">
                      <span className="l-hi">{f.hi} <span className="text-sindoor transition-colors group-hover:text-turmeric">→</span> {t.hi}</span>
                      <span className="l-en">{f.name} <span className="text-sindoor transition-colors group-hover:text-turmeric">→</span> {t.name}</span>
                    </Link>
                    <span className="col-start-2 hidden text-lg text-ink/55 transition-colors group-hover:text-ivory/60 md:col-start-auto md:block">
                      <span className="l-hi">{f.name} → {t.name}</span>
                      <span className="l-en">{f.hi} से {t.hi}</span>
                    </span>
                    {/* Both fares, each its own big tap target */}
                    <div className="col-span-2 grid grid-cols-2 gap-2 md:col-span-1 md:col-start-2 md:row-start-2 lg:col-start-auto lg:row-start-auto lg:flex lg:gap-5">
                      {[r.small, r.large].map((fare) => (
                        <a
                          key={fare.seats}
                          href={waLink(msg(fare.seats, fare.fare))}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={guard}
                          className="relative z-10 flex flex-col rounded-2xl border border-ink/10 px-4 py-2 transition-colors hover:border-turmeric group-hover:border-ivory/20 lg:border-0 lg:p-0 lg:text-right"
                        >
                          <span className="flex items-center gap-1.5 text-sm font-semibold opacity-70 lg:justify-end">
                            <Seats n={fare.seats} className="hidden sm:inline-block" /> {fare.seats} <T hi="सीट" en="seater" />
                          </span>
                          <span className="font-display text-3xl tabular-nums md:text-4xl">{inr(fare.fare)}</span>
                        </a>
                      ))}
                    </div>
                    <a
                      href={waLink(msg(r.small.seats, r.small.fare))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={guard}
                      className="relative z-10 col-span-2 rounded-full border-2 border-current px-6 py-3 text-center text-lg font-bold transition-colors hover:border-sindoor hover:bg-sindoor hover:text-ivory md:col-span-1 md:col-start-4 md:row-span-2 md:row-start-1 lg:col-start-auto lg:row-span-1 lg:row-start-auto"
                    >
                      <T hi="बुक करें" en="Book" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        <p className="mt-6 text-ink/75">
          <T hi="हर रूट पर एक तरफ़ और आना-जाना दोनों उपलब्ध। अपना रूट नहीं दिखा? " en="One way and round trip on every route. Don't see yours? " />
          <Link href="/#map" className="font-semibold text-sindoor underline underline-offset-4"><T hi="नक्शे पर कोई भी दो जगह चुनिए" en="Pick any two places on the map" /></Link>
        </p>
      </div>
    </section>
  );
}
