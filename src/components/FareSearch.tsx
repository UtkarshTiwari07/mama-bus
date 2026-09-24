"use client";

import { useId, useState } from "react";
import { inr } from "@/content/routes";
import { placeGroups, quote } from "@/lib/places";
import { waLink, telLink } from "@/lib/whatsapp";
import { useLang } from "@/i18n/LangProvider";
import { T } from "@/i18n/T";
import { PhoneIcon, Seats, WhatsAppIcon } from "./Icons";

/** "Where from → where to" in two taps, with the fare shown straight away. */
export function FareSearch() {
  const { lang } = useLang();
  const [from, setFrom] = useState("patna");
  const [to, setTo] = useState("gaya");
  const id = useId();
  const groups = placeGroups(lang);
  const small = quote(from, to, "small", lang);
  const large = quote(from, to, "large", lang);
  const same = from === to;

  const select = "w-full appearance-none rounded-2xl border-2 border-ink/15 bg-white px-4 py-3.5 text-lg font-semibold text-ink focus:border-sindoor focus:outline-none";
  const options = groups.map((g) => (
    <optgroup key={g.label.en} label={g.label[lang]}>
      {g.places.map((p) => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
    </optgroup>
  ));

  return (
    <div className="rounded-[1.75rem] bg-ivory p-5 text-ink shadow-[0_30px_80px_-20px_rgb(14_33_28/0.55)] md:p-6">
      <p className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-8 items-center justify-center rounded-full bg-sindoor text-ivory">₹</span>
        <T hi="किराया तुरंत देखें" en="Check your fare" />
      </p>
      <div className="grid gap-3">
        <div>
          <label htmlFor={`${id}-f`} className="mb-1 block text-sm font-semibold text-ink/70"><T hi="① कहाँ से?" en="① From where?" /></label>
          <select id={`${id}-f`} value={from} onChange={(e) => setFrom(e.target.value)} className={select}>{options}</select>
        </div>
        <button type="button" onClick={() => { setFrom(to); setTo(from); }} className="mx-auto -my-1 flex size-10 items-center justify-center rounded-full border-2 border-ink/15 bg-white text-lg hover:border-sindoor" aria-label={lang === "hi" ? "उलट दें" : "Swap"}>⇅</button>
        <div>
          <label htmlFor={`${id}-t`} className="mb-1 block text-sm font-semibold text-ink/70"><T hi="② कहाँ तक?" en="② To where?" /></label>
          <select id={`${id}-t`} value={to} onChange={(e) => setTo(e.target.value)} className={select}>{options}</select>
        </div>
      </div>

      <div className="mt-4" aria-live="polite">
        {same ? (
          <p className="rounded-2xl bg-ivory-2 p-4 text-center font-semibold"><T hi="दो अलग जगह चुनिए" en="Pick two different places" /></p>
        ) : small.fare && large.fare ? (
          <div className="grid grid-cols-2 gap-3">
            {[small, large].map((q) => (
              <a
                key={q.fare!.seats}
                href={waLink(q.message)}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl border-2 border-ink/10 bg-white p-3 text-center transition-colors hover:border-sindoor"
              >
                <Seats n={q.fare!.seats} className="justify-center text-ink/60" />
                <span className="mt-1 block text-sm text-ink/70">{q.fare!.seats} <T hi="सीट" en="seater" /></span>
                <span className="block font-display text-3xl font-semibold text-sindoor tabular-nums">{inr(q.fare!.fare)}</span>
                <span className="mt-1 block text-sm font-bold text-ink group-hover:text-sindoor"><T hi="बुक करें →" en="Book →" /></span>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-ivory-2 p-4">
            <p className="font-semibold"><T hi="इस रूट का किराया WhatsApp पर पूछें — कुछ ही मिनट में जवाब।" en="Ask for this route's fare on WhatsApp — we reply in minutes." /></p>
            <div className="mt-3 flex gap-2">
              <a href={waLink(small.message)} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-4 py-3 font-bold text-white">
                <WhatsAppIcon className="size-5" /> <T hi="किराया पूछें" en="Get fare" />
              </a>
              <a href={telLink} className="flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 font-bold text-ivory">
                <PhoneIcon className="size-5" /> <T hi="कॉल" en="Call" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
