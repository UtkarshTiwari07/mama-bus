import { heritage } from "@/content/heritage";
import { waLink } from "@/lib/whatsapp";
import { T } from "@/i18n/T";
import { Lotus } from "./Madhubani";

export function Heritage() {
  const items = [...heritage, ...heritage];
  return (
    <section id="heritage" className="overflow-hidden py-20 md:py-32">
      <div className="mx-auto mb-12 max-w-[1400px] px-4 text-center md:px-8">
        <Lotus className="mx-auto mb-6 h-14 text-terracotta" />
        <p className="eyebrow mb-4 text-sindoor"><T hi="तीर्थ यात्रा और घूमना" en="Pilgrimage & sightseeing" /></p>
        <h2 className="font-display text-[10vw] leading-[1] tracking-tight md:text-[5rem]" data-split>
          <T hi="जहाँ बिहार की कहानियाँ बसती हैं" en="Where the stories of Bihar live" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/85" data-reveal>
          <T
            hi="गया में पिंडदान, महाबोधि के दर्शन, नालंदा के खंडहर, काशी के घाट — सफ़र हम प्लान करेंगे, यादें आप बनाइए।"
            en="Pind Daan at Gaya, the Mahabodhi, the ruins of Nalanda, the ghats of Kashi — we plan the drive, you keep the memories."
          />
        </p>
        <a href={waLink("नमस्ते, मुझे तीर्थ यात्रा / टूर पैकेज की जानकारी चाहिए।")} target="_blank" rel="noopener" className="mt-7 inline-block rounded-full bg-sindoor px-7 py-4 text-lg font-bold text-ivory" data-reveal>
          <T hi="यात्रा प्लान करवाएँ" en="Plan my trip" />
        </a>
      </div>
      <div className="marquee-wrap">
        <ul className="marquee gap-5 pr-5" style={{ ["--marquee-duration" as string]: "80s" }}>
          {items.map((h, i) => (
            <li key={i} className="group relative h-[24rem] w-[17rem] shrink-0 overflow-hidden rounded-[1.75rem] md:h-[30rem] md:w-[22rem]" aria-hidden={i >= heritage.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.image} alt={i < heritage.length ? `${h.note.en}, ${h.name.en}` : ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-ivory">
                <p className="font-display text-4xl text-turmeric md:text-5xl"><T b={h.name} /></p>
                <p className="mt-1 text-lg"><T b={h.note} /></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
