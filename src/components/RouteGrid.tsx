"use client";

import Link from "next/link";
import { useState } from "react";
import { cities, inr, routes, type Route } from "@/content/routes";
import { waLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { T } from "@/i18n/T";
import { SearchIcon, Seats } from "./Icons";

export function RouteGrid({ heading = true, list = routes, search = true }: { heading?: boolean; list?: Route[]; search?: boolean }) {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle
    ? list.filter((r) => [r.from, r.to].some((c) => cities[c].name.toLowerCase().includes(needle) || cities[c].hi.includes(q.trim())))
    : list;
  const name = (c: Route["from"]) => (lang === "hi" ? cities[c].hi : cities[c].name);

  return (
    <section id="routes" className="px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {heading ? (
            <div>
              <p className="eyebrow mb-4 text-sindoor"><T hi="तय किराया" en="Fixed fares" /></p>
              <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5rem]" data-split>
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
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "hi" ? "अपना शहर खोजें — जैसे गया" : "Search your city — e.g. Gaya"}
                className="w-full bg-transparent text-lg outline-none placeholder:text-ink/45"
              />
            </label>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="rounded-2xl bg-ivory-2 p-6 text-lg">
            <T hi="यह शहर लिस्ट में नहीं है — पर हम वहाँ भी जाते हैं! " en="That city isn't listed — but we go there too! " />
            <a href={waLink(lang === "hi" ? `नमस्ते, मुझे ${q} के लिए गाड़ी चाहिए।` : `Hello, I need a cab for ${q}.`)} target="_blank" rel="noopener" className="font-bold text-sindoor underline underline-offset-4">
              <T hi="WhatsApp पर किराया पूछें" en="Ask the fare on WhatsApp" />
            </a>
          </p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((r) => (
              <li key={r.slug} className="group flex flex-col rounded-[1.5rem] border-2 border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sindoor/40 hover:shadow-[0_20px_50px_-20px_rgb(22_48_42/0.35)]" data-reveal>
                <Link href={`/routes/${r.slug}/`} className="flex items-center gap-2 font-display text-2xl leading-tight md:text-[1.7rem]">
                  <span>{name(r.from)}</span>
                  <span className="text-sindoor transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span>{name(r.to)}</span>
                </Link>
                <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
                  {(["small", "large"] as const).map((size) => {
                    const f = r[size];
                    const msg = lang === "hi"
                      ? `नमस्ते, मुझे ${cities[r.from].hi} से ${cities[r.to].hi} के लिए ${f.seats} सीट वाली गाड़ी बुक करनी है (${inr(f.fare)}).`
                      : `Hello, I want to book a ${f.seats} seater from ${cities[r.from].name} to ${cities[r.to].name} (${inr(f.fare)}).`;
                    return (
                      <a key={size} href={waLink(msg)} target="_blank" rel="noopener" className="flex flex-col rounded-2xl bg-ivory p-3 transition-colors hover:bg-sindoor hover:text-ivory">
                        <Seats n={f.seats} className="opacity-60" />
                        <span className="mt-1 text-sm font-semibold opacity-80">{f.seats} <T hi="सीट" en="seater" /></span>
                        <span className="font-display text-2xl font-semibold tabular-nums md:text-3xl">{inr(f.fare)}</span>
                        <span className="mt-1 text-sm font-bold"><T hi="बुक करें →" en="Book →" /></span>
                      </a>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-ink/75">
          <T hi="हर रूट पर एक तरफ़ और आना-जाना दोनों उपलब्ध। अपना रूट नहीं दिखा? " en="One way and round trip on every route. Don't see yours? " />
          <Link href="/#map" className="font-semibold text-sindoor underline underline-offset-4"><T hi="नक्शे पर कोई भी दो जगह चुनिए" en="Pick any two places on the map" /></Link>
        </p>
      </div>
    </section>
  );
}
