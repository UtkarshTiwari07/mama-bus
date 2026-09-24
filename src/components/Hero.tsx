import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";

const WORD = "SHRI SHYAM BABA";

export function Hero() {
  return (
    <section className="relative">
      {/* Edge-to-edge wordmark, letters rising in on load */}
      <div className="px-3 pt-28 md:px-6 md:pt-32">
        <p className="eyebrow mb-4 flex items-center justify-between text-ink/60 md:mb-2">
          <span>Patna · Bihar</span>
          <span className="hindi text-base normal-case text-sindoor">{site.taglineHi}</span>
          <span className="hidden md:inline">Tour &amp; Travels · Est. in Patna</span>
        </p>
        <h1 className="sr-only">{site.name} — {site.tagline}</h1>
        <div
          aria-hidden="true"
          className="flex justify-between overflow-hidden font-sans text-[10.8vw] leading-[0.82] font-extrabold tracking-[-0.055em] text-ink"
        >
          {/* Whole words animate (not letters) so the font's kerning survives. */}
          {WORD.split(" ").map((word, w) => (
            <span
              key={word}
              className="inline-block animate-[rise_1.3s_cubic-bezier(0.16,1,0.3,1)_both] pb-[0.06em]"
              style={{ animationDelay: `${0.15 + w * 0.12}s` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Photo panel with drifting mist */}
      <div className="relative mt-4 h-[88svh] min-h-[560px] overflow-hidden md:mt-6">
        <div className="absolute inset-0 scale-110" data-parallax="0.12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/ganga-ghat.webp"
            alt="Mahatma Gandhi Setu over the Ganga at dusk, seen from Gandhi Ghat, Patna"
            className="h-full w-full object-cover object-[center_35%]"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-transparent to-ink/80" />
        <div className="mist" />
        <div className="mist slow" />

        <div className="relative flex h-full flex-col justify-between px-4 py-6 text-ivory md:px-10 md:py-10">
          <div className="eyebrow hidden justify-between text-ivory/90 md:flex">
            <span>Local cabs</span>
            <span>Outstation · One way &amp; round trip</span>
            <span>Pilgrimage tours</span>
          </div>

          <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="hindi mb-3 text-2xl text-turmeric md:text-3xl" data-reveal data-reveal-delay="0.6">
                बिहार, हर कोने तक
              </p>
              <p className="font-display text-[13vw] leading-[0.9] font-light tracking-tight md:text-[6.2vw]" data-split data-split-delay="0.5">
                Bihar, <em className="font-normal">every corner</em> of it.
              </p>
            </div>
            <div className="md:justify-self-end" data-reveal data-reveal-delay="0.9">
              <p className="mb-5 max-w-sm text-base text-ivory/85 md:text-lg">
                {site.tagline}. Clean, GPS-enabled cars and fixed fares — from a Patna local drop to a family yatra across the state.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={waLink()} target="_blank" rel="noopener" className="eyebrow rounded-full bg-sindoor px-7 py-4 text-ivory transition-colors hover:bg-ivory hover:text-ink">
                  Book on WhatsApp
                </a>
                <Link href="/#map" className="eyebrow rounded-full border border-ivory/40 px-7 py-4 backdrop-blur-sm transition-colors hover:bg-ivory/15">
                  Plan a route
                </Link>
              </div>
            </div>
          </div>
        </div>

        <a href="#manifesto" className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 md:flex" aria-label="Scroll to discover">
          <span className="block h-10 w-px animate-pulse bg-ivory/60" />
        </a>
      </div>
      <style>{`@keyframes rise{from{transform:translateY(105%)}to{transform:none}}`}</style>
    </section>
  );
}
