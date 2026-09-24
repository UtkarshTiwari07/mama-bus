"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { useCooldown } from "@/lib/throttle";
import { T } from "@/i18n/T";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const field = "w-full rounded-xl border-2 border-ivory/20 bg-ink-2/70 px-4 py-3.5 text-lg text-ivory placeholder:text-ivory/40 focus:border-turmeric focus:outline-none";
const label = "mb-2 block font-semibold text-ivory/80";

export function BookingForm() {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [trip, setTrip] = useState<"one" | "round">("one");
  const { run, cooling } = useCooldown(10_000);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const tripText = trip === "one" ? (hi ? "एक तरफ़" : "One way") : hi ? "आना-जाना" : "Round trip";
    const lines = hi
      ? ["नमस्ते, मुझे गाड़ी बुक करनी है।", `नाम: ${f.get("name")}`, `कहाँ से: ${f.get("pickup")}`, `कहाँ तक: ${f.get("drop")}`, `तारीख़: ${f.get("date")}${f.get("time") ? `, समय: ${f.get("time")}` : ""}`, `गाड़ी: ${f.get("car")}`, `यात्रा: ${tripText}`, `कितने लोग: ${f.get("passengers")}`]
      : ["Hello, I want to book a cab.", `Name: ${f.get("name")}`, `Pickup: ${f.get("pickup")}`, `Drop: ${f.get("drop")}`, `Date: ${f.get("date")}${f.get("time") ? ` at ${f.get("time")}` : ""}`, `Car: ${f.get("car")}`, `Trip: ${tripText}`, `Passengers: ${f.get("passengers")}`];
    // Keep each field short so a pasted wall of text can't bloat the message.
    const clean = lines.map((l) => l.slice(0, 120)).join("\n");
    run(() => window.open(waLink(clean), "_blank", "noopener,noreferrer"));
  };

  const cars = hi ? ["5 सीट (सेडान)", "7 सीट (अर्टिगा)", "7 सीट (इनोवा)"] : ["5 Seater (Sedan)", "7 Seater (Ertiga)", "7 Seater (Innova)"];

  return (
    <section id="book" className="relative overflow-hidden px-4 py-20 text-ivory md:px-8 md:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero/gandhi-setu-1200.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4 text-turmeric"><T hi="बुकिंग" en="Book your ride" /></p>
          <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5rem]" data-split>
            <T hi="बताइए कहाँ जाना है, गाड़ी हम भेजेंगे।" en="Tell us where. We'll be there." />
          </h2>
          <p className="mt-6 max-w-md text-lg text-ivory/85" data-reveal>
            <T
              hi="फ़ॉर्म भरिए — WhatsApp अपने आप खुल जाएगा, बस भेज दीजिए। या सीधे कॉल कीजिए।"
              en="Fill this in and WhatsApp opens with your trip ready to send. Or just call us."
            />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" data-reveal>
            <a href={telLink} className="flex items-center justify-center gap-3 rounded-full bg-sindoor px-7 py-4 text-lg font-bold">
              <PhoneIcon /> {site.phone}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-full bg-[#1f8f4e] px-7 py-4 text-lg font-bold text-white">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
          <a href={`mailto:${site.email}`} className="mt-4 block text-ivory/70 hover:text-ivory">{site.email}</a>
        </div>

        <form onSubmit={submit} className="grid gap-5 rounded-[2rem] border border-ivory/15 bg-ivory/[0.09] p-6 md:grid-cols-2 md:p-10" data-reveal>
          <div className="md:col-span-2">
            <span className={label}><T hi="यात्रा" en="Trip type" /></span>
            <div className="flex rounded-full border-2 border-ivory/20 p-1" role="radiogroup" aria-label={hi ? "यात्रा" : "Trip type"}>
              {(["one", "round"] as const).map((t) => (
                <button key={t} type="button" role="radio" aria-checked={trip === t} onClick={() => setTrip(t)} className={`flex-1 rounded-full py-3 text-lg font-semibold transition-colors ${trip === t ? "bg-ivory text-ink" : "text-ivory/75"}`}>
                  {t === "one" ? <T hi="एक तरफ़" en="One way" /> : <T hi="आना-जाना" en="Round trip" />}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="bk-name" className={label}><T hi="आपका नाम" en="Your name" /></label>
            <input id="bk-name" name="name" required maxLength={60} autoComplete="name" className={field} placeholder={hi ? "पूरा नाम" : "Full name"} />
          </div>
          <div>
            <label htmlFor="bk-pickup" className={label}><T hi="कहाँ से?" en="Pickup" /></label>
            <input id="bk-pickup" name="pickup" required maxLength={80} className={field} placeholder={hi ? "जैसे पटना जंक्शन" : "e.g. Patna Junction"} />
          </div>
          <div>
            <label htmlFor="bk-drop" className={label}><T hi="कहाँ तक?" en="Drop" /></label>
            <input id="bk-drop" name="drop" required maxLength={80} className={field} placeholder={hi ? "जैसे बोधगया" : "e.g. Bodh Gaya"} />
          </div>
          <div>
            <label htmlFor="bk-date" className={label}><T hi="तारीख़" en="Date" /></label>
            <input id="bk-date" name="date" type="date" required className={`${field} [color-scheme:dark]`} />
          </div>
          <div>
            <label htmlFor="bk-time" className={label}><T hi="समय" en="Time" /></label>
            <input id="bk-time" name="time" type="time" className={`${field} [color-scheme:dark]`} />
          </div>
          <div>
            <label htmlFor="bk-car" className={label}><T hi="गाड़ी" en="Car" /></label>
            <select id="bk-car" name="car" className={field} defaultValue={cars[0]}>
              {cars.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="bk-pax" className={label}><T hi="कितने लोग?" en="Passengers" /></label>
            <input id="bk-pax" name="passengers" type="number" min={1} max={7} defaultValue={2} className={field} />
          </div>
          <button type="submit" disabled={cooling} className="mt-2 flex items-center justify-center gap-3 rounded-full bg-[#1f8f4e] px-8 py-5 text-lg font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 md:col-span-2">
            <WhatsAppIcon /> {cooling ? <T hi="भेज दिया ✓ — WhatsApp देखें" en="Sent ✓ — check WhatsApp" /> : <T hi="WhatsApp पर भेजें" en="Send on WhatsApp" />}
          </button>
        </form>
      </div>
    </section>
  );
}
