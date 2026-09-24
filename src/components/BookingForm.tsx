"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";

const field = "w-full rounded-xl border border-ivory/20 bg-ink-2/70 px-4 py-3.5 text-ivory placeholder:text-ivory/35 focus:border-turmeric focus:outline-none";
const label = "eyebrow mb-2 block text-ivory/55";

export function BookingForm() {
  const [trip, setTrip] = useState<"One way" | "Round trip">("One way");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      "Hello, I want to book a cab.",
      `Name: ${f.get("name")}`,
      `Pickup: ${f.get("pickup")}`,
      `Drop: ${f.get("drop")}`,
      `Date: ${f.get("date")}${f.get("time") ? ` at ${f.get("time")}` : ""}`,
      `Car: ${f.get("car")}`,
      `Trip: ${trip}`,
      `Passengers: ${f.get("passengers")}`,
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <section id="book" className="relative overflow-hidden px-4 py-24 text-ivory md:px-8 md:py-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero/gandhi-setu.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" data-parallax="0.1" />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow mb-5 text-turmeric">Book your ride · <span className="hindi text-[0.95rem]">बुकिंग</span></p>
          <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5.5rem]" data-split>
            Tell us where. <em>We&apos;ll be there.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ivory/75" data-reveal>
            Fill this in and it opens WhatsApp with your trip ready to send. We confirm availability and your fixed fare straight back.
          </p>
          <div className="mt-10 space-y-3" data-reveal>
            <a href={telLink} className="block font-display text-4xl hover:text-turmeric md:text-5xl">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block text-ivory/70 hover:text-ivory">{site.email}</a>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-5 rounded-[2rem] border border-ivory/15 bg-ivory/[0.06] p-6 backdrop-blur-md md:grid-cols-2 md:p-10" data-reveal>
          <div className="md:col-span-2">
            <span className={label}>Trip type</span>
            <div className="flex rounded-full border border-ivory/20 p-1" role="radiogroup" aria-label="Trip type">
              {(["One way", "Round trip"] as const).map((t) => (
                <button key={t} type="button" role="radio" aria-checked={trip === t} onClick={() => setTrip(t)} className={`eyebrow flex-1 rounded-full py-3 transition-colors ${trip === t ? "bg-ivory text-ink" : "text-ivory/70"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bk-name" className={label}>Your name</label>
            <input id="bk-name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
          </div>
          <div>
            <label htmlFor="bk-pickup" className={label}>Pickup</label>
            <input id="bk-pickup" name="pickup" required className={field} placeholder="e.g. Patna Junction" />
          </div>
          <div>
            <label htmlFor="bk-drop" className={label}>Drop</label>
            <input id="bk-drop" name="drop" required className={field} placeholder="e.g. Bodh Gaya" />
          </div>
          <div>
            <label htmlFor="bk-date" className={label}>Date</label>
            <input id="bk-date" name="date" type="date" required className={`${field} [color-scheme:dark]`} />
          </div>
          <div>
            <label htmlFor="bk-time" className={label}>Time</label>
            <input id="bk-time" name="time" type="time" className={`${field} [color-scheme:dark]`} />
          </div>
          <div>
            <label htmlFor="bk-car" className={label}>Car</label>
            <select id="bk-car" name="car" className={field} defaultValue="5 Seater">
              <option>5 Seater</option>
              <option>7 Seater Ertiga</option>
              <option>7 Seater Innova</option>
            </select>
          </div>
          <div>
            <label htmlFor="bk-pax" className={label}>Passengers</label>
            <input id="bk-pax" name="passengers" type="number" min={1} max={7} defaultValue={2} className={field} />
          </div>
          <button type="submit" className="eyebrow mt-2 rounded-full bg-sindoor px-8 py-5 text-ivory transition-colors hover:bg-ivory hover:text-ink md:col-span-2">
            Send on WhatsApp →
          </button>
        </form>
      </div>
    </section>
  );
}
