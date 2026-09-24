"use client";

import { useEffect, useId, useState } from "react";
import map from "@/content/bihar-map.json";
import paths from "@/content/bihar-paths.json";
import { cities, inr, routes, routeTitleBi } from "@/content/routes";
import { haversineKm } from "@/lib/geo";
import { districtPlace, placeGroups, PLACES, quote } from "@/lib/places";
import { telLink, waLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { useLinkCooldown } from "@/lib/throttle";
import { T } from "@/i18n/T";
import { PhoneIcon, Seats, WhatsAppIcon } from "./Icons";

// Labels that would collide go to the left of their dot.
const LABEL_LEFT = new Set(["muzaffarpur", "aurangabad", "raxaul", "banaras"]);

function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.22) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M${a.x},${a.y} Q${mx - dy * bend},${my + dx * bend} ${b.x},${b.y}`;
}

// One arc per unordered pair (Patna ⇄ Aurangabad is listed both ways).
const NETWORK = Array.from(new Map(routes.map((r) => [[r.from, r.to].sort().join("|"), r])).values());

// Where off-map UP places point to: the west edge, level with Banaras.
const UP_EDGE = { x: map.cities.banaras.x - 40, y: map.cities.banaras.y - 60 };

export default function BiharMap() {
  const { lang } = useLang();
  const guard = useLinkCooldown();
  const [from, setFrom] = useState<string>("patna");
  const [to, setTo] = useState<string>("gaya");
  const [picking, setPicking] = useState<"from" | "to">("from");
  const [hoverDistrict, setHoverDistrict] = useState<string | null>(null);
  const [hoverRoute, setHoverRoute] = useState<string | null>(null);
  const ids = { from: useId(), to: useId() };

  // Start the phone-width map centred on Patna.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-map-scroll]");
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (cities.patna.x / map.width) * el.scrollWidth - el.clientWidth / 2;
  }, []);

  const small = quote(from, to, "small", lang);
  const large = quote(from, to, "large", lang);
  const { a, b } = small;
  const same = from === to;
  const km = !same ? Math.round(haversineKm(a.lonlat, b.lonlat)) : 0;
  const pt = (p: typeof a) => (p.onMap ? p : UP_EDGE);

  const pick = (placeId: string) => {
    if (picking === "from") {
      setFrom(placeId);
      if (placeId === to) setTo(from);
      setPicking("to");
    } else {
      if (placeId === from) return;
      setTo(placeId);
      setPicking("from");
    }
  };

  const options = placeGroups(lang).map((g) => (
    <optgroup key={g.label.en} label={g.label[lang]}>
      {g.places.map((p) => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
    </optgroup>
  ));

  const chip = (step: "from" | "to") => {
    const active = picking === step;
    const place = step === "from" ? a : b;
    return (
      <button
        type="button"
        onClick={() => setPicking(step)}
        className={`flex flex-1 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${active ? "border-turmeric bg-turmeric/15" : "border-ivory/15 hover:border-ivory/35"}`}
        aria-pressed={active}
      >
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${step === "from" ? "bg-sindoor" : "bg-turmeric text-ink"}`}>{step === "from" ? "1" : "2"}</span>
        <span>
          <span className="block text-sm text-ivory/65">{step === "from" ? <T hi="कहाँ से?" en="From where?" /> : <T hi="कहाँ तक?" en="To where?" />}</span>
          <span className="block text-xl font-bold">{place.name[lang]}</span>
        </span>
      </button>
    );
  };

  return (
    <section id="map" className="relative overflow-hidden bg-ink px-4 py-20 text-ivory md:px-8 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4 text-turmeric"><T hi="बिहार में कहीं भी जाइए" en="Connect anywhere in Bihar" /></p>
            <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5rem]" data-split>
              <T hi="38 ज़िले। एक नंबर।" en="38 districts. One number." />
            </h2>
          </div>
          <p className="max-w-md text-lg text-ivory/85 md:justify-self-end md:text-right" data-reveal>
            <T
              hi="नक्शे पर पहले वह ज़िला दबाइए जहाँ से जाना है, फिर वह जहाँ पहुँचना है। किराया नीचे दिख जाएगा।"
              en="Tap the district you're leaving from, then the one you're going to. The fare shows below."
            />
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row" role="group" aria-label={lang === "hi" ? "चुनाव" : "Selection"}>
          {chip("from")}
          <span className="hidden self-center text-2xl text-turmeric sm:block" aria-hidden="true">→</span>
          {chip("to")}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-6">
          <ul className="order-2 hidden lg:order-1 lg:block" aria-label={lang === "hi" ? "ज़्यादा बुक होने वाले रूट" : "Most-booked routes"}>
            {routes.map((r, i) => {
              const t = (i - (routes.length - 1) / 2) / ((routes.length - 1) / 2);
              const indent = 70 * (1 - Math.sqrt(1 - 0.9 * t * t));
              const active = (from === r.from && to === r.to) || hoverRoute === r.slug;
              return (
                <li key={r.slug} style={{ paddingLeft: indent }}>
                  <button
                    type="button"
                    onMouseEnter={() => setHoverRoute(r.slug)}
                    onMouseLeave={() => setHoverRoute(null)}
                    onFocus={() => setHoverRoute(r.slug)}
                    onBlur={() => setHoverRoute(null)}
                    onClick={() => { setFrom(r.from); setTo(r.to); setPicking("from"); }}
                    className={`group flex w-full items-baseline gap-3 py-1.5 text-left transition-colors ${active ? "text-turmeric" : "text-ivory/80 hover:text-ivory"}`}
                  >
                    <span className="w-14 shrink-0 text-right text-sm text-ivory/50 tabular-nums">{inr(r.small.fare)}</span>
                    <span className={`size-1.5 shrink-0 rounded-full transition-colors ${active ? "bg-sindoor" : "bg-turmeric/60"}`} />
                    <span className="eyebrow text-[0.72rem]"><T b={routeTitleBi(r)} /></span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative">
              <p className="pointer-events-none absolute top-0 left-0 z-10 rounded-full bg-ivory/10 px-3 py-1 text-sm font-semibold text-ivory/85" aria-live="polite">
                {hoverDistrict ?? (picking === "from" ? <T hi="① जहाँ से जाना है, वह ज़िला दबाइए" en="① Tap where you're leaving from" /> : <T hi="② अब जहाँ जाना है, वह दबाइए" en="② Now tap where you're going" />)}
              </p>
              {/* On phones the map keeps a readable size and pans sideways. */}
              <div className="-mx-4 overflow-x-auto px-4 pt-9 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0" data-map-scroll>
                <svg viewBox={`0 0 ${map.width} ${map.height}`} className="h-auto w-[720px] max-w-none md:w-full md:max-w-full" role="group" aria-label={lang === "hi" ? "बिहार के 38 ज़िलों का नक्शा" : "Map of Bihar's 38 districts"}>
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#d6a23e" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#d6a23e" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <g>
                    {map.districts.map((d) => {
                      const pid = districtPlace(d.name);
                      const name = PLACES[pid].name[lang];
                      return (
                        <path
                          key={d.name}
                          d={(paths as Record<string, string>)[d.name]}
                          role="button"
                          tabIndex={0}
                          aria-label={name}
                          data-district={d.name}
                          onClick={() => pick(pid)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(pid); } }}
                          onMouseEnter={() => setHoverDistrict(name)}
                          onMouseLeave={() => setHoverDistrict(null)}
                          className={`cursor-pointer outline-none transition-[fill] duration-300 focus-visible:fill-turmeric/40 ${
                            pid === from ? "fill-sindoor/55" : pid === to ? "fill-turmeric/45" : "fill-ivory/[0.06] hover:fill-ivory/20"
                          }`}
                          stroke="rgb(243 238 228 / 0.28)"
                          strokeWidth="0.8"
                        />
                      );
                    })}
                  </g>

                  <text x={map.cities.banaras.x - 10} y={map.cities.banaras.y + 46} className="fill-ivory/45 text-[15px] italic">
                    {lang === "hi" ? "उत्तर प्रदेश ←" : "← Uttar Pradesh"}
                  </text>

                  <g fill="none" pointerEvents="none">
                    {NETWORK.map((r, i) => {
                      const hot = hoverRoute === r.slug;
                      return (
                        <path
                          key={r.slug}
                          d={arc(cities[r.from], cities[r.to])}
                          stroke={hot ? "#d6a23e" : "rgb(214 162 62 / 0.45)"}
                          strokeWidth={hot ? 2.4 : 1.1}
                          data-draw=""
                          data-draw-delay={String(i * 0.06)}
                          style={{ transition: "stroke 300ms, stroke-width 300ms" }}
                        />
                      );
                    })}
                    {!same && (
                      <>
                        <path id="sel-arc" key={`${from}-${to}`} d={arc(pt(a), pt(b), 0.3)} stroke="#b3362b" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1 9" className="animate-[dash_1.2s_linear_infinite]" />
                        {/* A little car drives the chosen route */}
                        <g key={`car-${from}-${to}`}>
                          <circle r="9" fill="#f3eee4" />
                          <text textAnchor="middle" dy="5" fontSize="13">🚕</text>
                          <animateMotion dur="3s" repeatCount="indefinite" rotate="0" path={arc(pt(a), pt(b), 0.3)} />
                        </g>
                      </>
                    )}
                  </g>

                  <g pointerEvents="none">
                    <circle cx={cities.patna.x} cy={cities.patna.y} r="34" fill="url(#glow)" className="animate-pulse" />
                    {Object.entries(cities).map(([id, c]) => (
                      <g key={id}>
                        <circle cx={c.x} cy={c.y} r={id === "patna" ? 6 : 3.6} className={id === from ? "fill-sindoor" : id === to ? "fill-turmeric" : "fill-ivory"} />
                        <text
                          x={LABEL_LEFT.has(id) ? c.x - 9 : c.x + 9}
                          y={c.y + 5}
                          textAnchor={LABEL_LEFT.has(id) ? "end" : "start"}
                          className={`text-[15px] ${id === "patna" ? "fill-ivory font-bold" : "fill-ivory/80"}`}
                        >
                          {lang === "hi" ? c.hi : c.name}
                        </text>
                      </g>
                    ))}
                    {[a, b].filter((p) => p.group === "bihar").map((p) => (
                      <g key={p.id}>
                        <circle cx={p.x} cy={p.y} r="4" className="fill-ivory" />
                        <text x={p.x + 9} y={p.y + 5} className="fill-ivory text-[15px] font-bold">{p.name[lang]}</text>
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
              <p className="mt-2 text-sm text-ivory/55 md:hidden"><T hi="← नक्शे को उँगली से खिसकाइए →" en="← Swipe to explore the map →" /></p>
            </div>

            {/* Trip planner */}
            <div className="mt-6 rounded-3xl border border-ivory/15 bg-ivory/[0.07] p-5 md:p-7">
              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
                <div>
                  <label htmlFor={ids.from} className="mb-2 block font-semibold text-ivory/70"><T hi="① कहाँ से?" en="① From" /></label>
                  <select id={ids.from} value={from} onChange={(e) => { const v = e.target.value; if (v === to) setTo(from); setFrom(v); }} className="w-full rounded-xl border-2 border-ivory/20 bg-ink-2 px-4 py-3.5 text-lg text-ivory">
                    {options}
                  </select>
                </div>
                <button type="button" onClick={() => { setFrom(to); setTo(from); }} className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-ivory/25 text-xl transition-colors hover:bg-ivory/10" aria-label={lang === "hi" ? "उलट दें" : "Swap"}>
                  ⇄
                </button>
                <div>
                  <label htmlFor={ids.to} className="mb-2 block font-semibold text-ivory/70"><T hi="② कहाँ तक?" en="② To" /></label>
                  <select id={ids.to} value={to} onChange={(e) => { const v = e.target.value; if (v === from) setFrom(to); setTo(v); }} className="w-full rounded-xl border-2 border-ivory/20 bg-ink-2 px-4 py-3.5 text-lg text-ivory">
                    {options}
                  </select>
                </div>
              </div>

              <div className="mt-5 border-t border-ivory/10 pt-5" aria-live="polite">
                <p className="font-display text-3xl md:text-4xl">
                  {a.name[lang]} <span className="text-turmeric">→</span> {b.name[lang]}
                </p>
                <p className="mt-1 text-ivory/65">
                  {same ? <T hi="दो अलग जगह चुनिए।" en="Pick two different places." /> : lang === "hi" ? `सीधी दूरी लगभग ${km} किमी · सड़क से थोड़ी ज़्यादा` : `≈ ${km} km as the crow flies · road distance is longer`}
                </p>

                {!same && (small.fare && large.fare ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[small, large].map((q) => (
                      <a key={q.fare!.seats} href={waLink(q.message)} target="_blank" rel="noopener noreferrer" onClick={guard} className="group flex items-center justify-between gap-4 rounded-2xl bg-ivory p-4 text-ink transition-transform hover:-translate-y-0.5">
                        <span>
                          <Seats n={q.fare!.seats} className="text-ink/60" />
                          <span className="block font-semibold">{q.fare!.seats} <T hi="सीट वाली गाड़ी" en="seater car" /></span>
                          <span className="block font-display text-4xl font-semibold text-sindoor tabular-nums">{inr(q.fare!.fare)}</span>
                        </span>
                        <span className="rounded-full bg-sindoor px-5 py-3 font-bold text-ivory group-hover:bg-ink"><T hi="बुक करें" en="Book" /></span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-ivory/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg"><T hi="इस रूट का तय किराया हम WhatsApp पर तुरंत बताएँगे।" en="We'll send you a fixed fare for this route on WhatsApp." /></p>
                    <div className="flex gap-2">
                      <a href={waLink(small.message)} target="_blank" rel="noopener noreferrer" onClick={guard} className="flex items-center gap-2 rounded-full bg-[#1f8f4e] px-5 py-3 font-bold text-white">
                        <WhatsAppIcon className="size-5" /> <T hi="किराया पूछें" en="Get a quote" />
                      </a>
                      <a href={telLink} className="flex items-center gap-2 rounded-full bg-sindoor px-5 py-3 font-bold text-ivory">
                        <PhoneIcon className="size-5" /> <T hi="कॉल" en="Call" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-ivory/40">District boundaries: Census of India 2011, via Datameet and india-maps-data.</p>
      </div>
      <style>{`@keyframes dash{to{stroke-dashoffset:-20}}`}</style>
    </section>
  );
}
