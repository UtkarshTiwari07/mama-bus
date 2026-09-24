"use client";

import { useEffect, useId, useMemo, useState } from "react";
import map from "@/content/bihar-map.json";
import { cities, findRoute, inr, routes, routeTitle, type CityKey } from "@/content/routes";
import { haversineKm } from "@/lib/geo";
import { waLink } from "@/lib/whatsapp";

type Place = { id: string; name: string; hi?: string; x: number; y: number; lonlat: readonly number[]; served: boolean };

// Labels that would collide go to the left of their dot.
const LABEL_LEFT = new Set(["muzaffarpur", "aurangabad", "raxaul", "banaras"]);

// A served city stands in for the district it sits in.
const DISTRICT_CITY: Record<string, CityKey> = {
  Patna: "patna",
  Gaya: "gaya",
  Darbhanga: "darbhanga",
  Muzaffarpur: "muzaffarpur",
  Siwan: "siwan",
  "East Champaran": "motihari",
  Bhagalpur: "bhagalpur",
  Katihar: "katihar",
  Purnia: "purniya",
  Aurangabad: "aurangabad",
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

const PLACES: Record<string, Place> = {
  ...Object.fromEntries(
    Object.entries(cities).map(([id, c]) => [id, { id, name: c.name, hi: c.hi, x: c.x, y: c.y, lonlat: c.lonlat, served: true }]),
  ),
  ...Object.fromEntries(
    map.districts
      .filter((d) => !DISTRICT_CITY[d.name])
      .map((d) => [`d-${slug(d.name)}`, { id: `d-${slug(d.name)}`, name: d.name, x: d.cx, y: d.cy, lonlat: [d.lon, d.lat], served: false }]),
  ),
};

const districtPlace = (name: string) => DISTRICT_CITY[name] ?? `d-${slug(name)}`;

function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.22) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M${a.x},${a.y} Q${mx - dy * bend},${my + dx * bend} ${b.x},${b.y}`;
}

// One arc per unordered pair (Patna ⇄ Aurangabad is listed both ways).
const NETWORK = Array.from(
  new Map(routes.map((r) => [[r.from, r.to].sort().join("|"), r])).values(),
);

export function BiharMap() {
  const [from, setFrom] = useState<string>("patna");
  const [to, setTo] = useState<string>("gaya");
  const [picking, setPicking] = useState<"from" | "to">("from");
  const [hoverDistrict, setHoverDistrict] = useState<string | null>(null);
  const [hoverRoute, setHoverRoute] = useState<string | null>(null);
  const [seats, setSeats] = useState<"small" | "large">("small");
  const ids = { from: useId(), to: useId() };

  // Start the phone-width map centred on Patna.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-map-scroll]");
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (cities.patna.x / map.width) * el.scrollWidth - el.clientWidth / 2;
  }, []);

  const a = PLACES[from];
  const b = PLACES[to];
  const route = findRoute(from, to);
  const km = a && b && from !== to ? Math.round(haversineKm(a.lonlat, b.lonlat)) : 0;

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

  const options = useMemo(() => {
    const served = Object.values(PLACES).filter((p) => p.served).sort((x, y) => x.name.localeCompare(y.name));
    const rest = Object.values(PLACES).filter((p) => !p.served).sort((x, y) => x.name.localeCompare(y.name));
    return (
      <>
        <optgroup label="Our most-booked cities">
          {served.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </optgroup>
        <optgroup label="Every other district of Bihar">
          {rest.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </optgroup>
      </>
    );
  }, []);

  const fare = route ? route[seats] : null;
  const message = route && fare
    ? `Hello, I want to book a ${fare.seats} seater cab from ${a.name} to ${b.name} (${inr(fare.fare)}).`
    : `Hello, I'd like a quote for a cab from ${a?.name} to ${b?.name}.`;

  const selectedDistricts = new Set([from, to]);

  return (
    <section id="map" className="relative overflow-hidden bg-ink px-4 py-24 text-ivory md:px-8 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-5 text-turmeric">Connect anywhere in Bihar</p>
            <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5.5rem]" data-split>
              38 districts. <em>One number.</em>
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="hindi text-3xl text-turmeric md:text-4xl" data-reveal>पूरा बिहार, एक कॉल पर</p>
            <p className="mt-3 max-w-md text-ivory/70 md:ml-auto" data-reveal>
              Tap a district to set your pickup, tap another for the drop. Our most-booked fares show instantly — anything else, we quote on WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-6">
          {/* Route list, curving along the map edge */}
          <ul className="order-2 hidden lg:order-1 lg:block" aria-label="Most-booked routes">
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
                    className={`group flex w-full items-baseline gap-3 py-1.5 text-left transition-colors ${active ? "text-turmeric" : "text-ivory/75 hover:text-ivory"}`}
                  >
                    <span className="w-14 shrink-0 text-right text-xs text-ivory/40 tabular-nums">{inr(r.small.fare)}</span>
                    <span className={`size-1.5 shrink-0 rounded-full transition-colors ${active ? "bg-sindoor" : "bg-turmeric/60"}`} />
                    <span className="eyebrow text-[0.7rem]">{routeTitle(r)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="relative">
              <p className="eyebrow pointer-events-none absolute top-0 left-0 z-10 text-ivory/50" aria-live="polite">
                {hoverDistrict ?? (picking === "from" ? "Tap your pickup" : "Now tap your drop")}
              </p>
              {/* On phones the map keeps a readable size and pans sideways. */}
              <div className="-mx-4 overflow-x-auto px-4 pt-6 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0" data-map-scroll>
              <svg viewBox={`0 0 ${map.width} ${map.height}`} className="h-auto w-[720px] max-w-none md:w-full md:max-w-full" role="group" aria-label="Map of Bihar's 38 districts">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d6a23e" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#d6a23e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <g>
                  {map.districts.map((d) => {
                    const pid = districtPlace(d.name);
                    const selected = selectedDistricts.has(pid);
                    return (
                      <path
                        key={d.name}
                        d={d.d}
                        role="button"
                        tabIndex={0}
                        aria-label={`${d.name} — set as ${picking === "from" ? "pickup" : "drop"}`}
                        onClick={() => pick(pid)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(pid); } }}
                        onMouseEnter={() => setHoverDistrict(d.name)}
                        onMouseLeave={() => setHoverDistrict(null)}
                        className={`cursor-pointer outline-none transition-[fill] duration-300 focus-visible:fill-turmeric/40 ${
                          pid === from ? "fill-sindoor/55" : pid === to ? "fill-turmeric/45" : selected ? "" : "fill-ivory/[0.06] hover:fill-ivory/20"
                        }`}
                        stroke="rgb(243 238 228 / 0.28)"
                        strokeWidth="0.8"
                      />
                    );
                  })}
                </g>

                {/* UP marker for the two cross-border cities */}
                <text x={map.cities.banaras.x - 10} y={map.cities.banaras.y + 46} className="fill-ivory/35 font-display text-[15px] italic">Uttar Pradesh</text>

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
                  {a && b && from !== to && (
                    <path key={`${from}-${to}`} d={arc(a, b, 0.3)} stroke="#b3362b" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1 9" className="animate-[dash_1.2s_linear_infinite]" />
                  )}
                </g>

                <g pointerEvents="none">
                  <circle cx={cities.patna.x} cy={cities.patna.y} r="34" fill="url(#glow)" className="animate-pulse" />
                  {Object.entries(cities).map(([id, c]) => (
                    <g key={id}>
                      <circle cx={c.x} cy={c.y} r={id === "patna" ? 6 : 3.6} className={id === from ? "fill-sindoor" : id === to ? "fill-turmeric" : "fill-ivory"} />
                      <text
                        x={LABEL_LEFT.has(id) ? c.x - 9 : c.x + 9}
                        y={c.y + 4}
                        textAnchor={LABEL_LEFT.has(id) ? "end" : "start"}
                        className={`text-[13px] tracking-[0.12em] uppercase ${id === "patna" ? "fill-ivory font-semibold" : "fill-ivory/70"}`}
                      >
                        {c.name}
                      </text>
                    </g>
                  ))}
                  {[a, b].filter((p) => p && !p.served).map((p) => (
                    <g key={p!.id}>
                      <circle cx={p!.x} cy={p!.y} r="4" className="fill-ivory" />
                      <text x={p!.x + 9} y={p!.y + 4} className="fill-ivory text-[13px] tracking-[0.12em] uppercase">{p!.name}</text>
                    </g>
                  ))}
                </g>
              </svg>
              </div>
              <p className="eyebrow mt-2 text-ivory/40 md:hidden">← Swipe to explore the map →</p>
            </div>

            {/* Trip planner */}
            <div className="mt-6 grid gap-4 rounded-3xl border border-ivory/15 bg-ivory/[0.04] p-5 backdrop-blur md:grid-cols-[1fr_auto_1fr_auto] md:items-end md:p-6">
              <div>
                <label htmlFor={ids.from} className="eyebrow mb-2 block text-ivory/50">Pickup</label>
                <select id={ids.from} value={from} onChange={(e) => { const v = e.target.value; if (v === to) setTo(from); setFrom(v); }} className="w-full rounded-xl border border-ivory/20 bg-ink-2 px-4 py-3 text-ivory">
                  {options}
                </select>
              </div>
              <button type="button" onClick={() => { setFrom(to); setTo(from); }} className="mx-auto flex size-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory/10" aria-label="Swap pickup and drop">
                ⇄
              </button>
              <div>
                <label htmlFor={ids.to} className="eyebrow mb-2 block text-ivory/50">Drop</label>
                <select id={ids.to} value={to} onChange={(e) => { const v = e.target.value; if (v === from) setFrom(to); setTo(v); }} className="w-full rounded-xl border border-ivory/20 bg-ink-2 px-4 py-3 text-ivory">
                  {options}
                </select>
              </div>
              <div className="flex rounded-full border border-ivory/20 p-1" role="radiogroup" aria-label="Car size">
                {(["small", "large"] as const).map((s) => (
                  <button key={s} type="button" role="radio" aria-checked={seats === s} onClick={() => setSeats(s)} className={`eyebrow rounded-full px-4 py-2.5 transition-colors ${seats === s ? "bg-ivory text-ink" : "text-ivory/70"}`}>
                    {s === "small" ? (route?.small.seats ?? 5) : 7} seater
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-ivory/10 pt-5 md:col-span-4 md:flex-row md:items-center md:justify-between">
                <div aria-live="polite">
                  <p className="font-display text-3xl md:text-4xl">
                    {a?.name} <span className="text-turmeric">→</span> {b?.name}
                  </p>
                  <p className="mt-1 text-sm text-ivory/60">
                    {from === to ? "Pick two different places." : `≈ ${km} km as the crow flies · road distance is longer`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {fare ? (
                    <p className="text-right">
                      <span className="eyebrow block text-ivory/50">{fare.seats} seater · fixed fare</span>
                      <span className="font-display text-4xl text-turmeric tabular-nums md:text-5xl">{inr(fare.fare)}</span>
                    </p>
                  ) : (
                    <p className="max-w-[16rem] text-sm text-ivory/70">Custom route — we&apos;ll send you a fixed quote on WhatsApp in minutes.</p>
                  )}
                  <a href={waLink(message)} target="_blank" rel="noopener" className={`eyebrow rounded-full px-7 py-4 transition-colors ${from === to ? "pointer-events-none opacity-40" : "bg-sindoor text-ivory hover:bg-ivory hover:text-ink"}`}>
                    {fare ? "Book this ride" : "Get a quote"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-ivory/35">District boundaries: Census of India 2011, via Datameet and india-maps-data.</p>
      </div>
      <style>{`@keyframes dash{to{stroke-dashoffset:-20}}`}</style>
    </section>
  );
}
