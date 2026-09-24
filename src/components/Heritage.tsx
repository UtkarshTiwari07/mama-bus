import { heritage } from "@/content/heritage";
import { Lotus } from "./Madhubani";

export function Heritage() {
  const items = [...heritage, ...heritage];
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto mb-14 max-w-[1400px] px-4 text-center md:px-8">
        <Lotus className="mx-auto mb-8 h-14 text-terracotta" />
        <p className="eyebrow mb-5 text-sindoor">Pilgrimage &amp; sightseeing</p>
        <h2 className="font-display text-[11vw] leading-[0.95] font-light tracking-tight md:text-[5.5rem]" data-split>
          Where the <em>stories</em> of Bihar live
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70" data-reveal>
          Pind Daan at Gaya, sunrise at the Mahabodhi, the ruins of Nalanda, the ghats of Kashi — we&apos;ll plan the drive, you keep the memories.
        </p>
      </div>
      <div className="marquee-wrap">
        <ul className="marquee gap-5 pr-5" style={{ ["--marquee-duration" as string]: "70s" }}>
          {items.map((h, i) => (
            <li key={i} className="group relative h-[26rem] w-[18rem] shrink-0 overflow-hidden rounded-[1.75rem] md:h-[32rem] md:w-[23rem]" aria-hidden={i >= heritage.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.image} alt={i < heritage.length ? `${h.note}, ${h.name}` : ""} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-ivory">
                <p className="hindi text-4xl text-turmeric md:text-5xl">{h.hi}</p>
                <p className="mt-1 font-display text-2xl">{h.name}</p>
                <p className="eyebrow mt-2 text-ivory/65">{h.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
