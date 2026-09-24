import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";
import { T } from "@/i18n/T";
import { Slideshow } from "./Slideshow";
import { FareSearch } from "./FareSearch";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const WORD = "SHRI SHYAM BABA";

export function Hero() {
  return (
    <section className="relative">
      {/* Wordmark band — whole words animate so the font's kerning survives */}
      <div className="px-3 pt-24 md:px-6 md:pt-28">
        <p className="eyebrow mb-2 flex items-center justify-between text-ink/65">
          <span><T hi="पटना · बिहार" en="Patna · Bihar" /></span>
          <span className="hindi text-base text-sindoor">{site.taglineHi}</span>
          <span className="hidden md:inline"><T hi="टूर एंड ट्रेवल्स" en="Tour & Travels" /></span>
        </p>
        <h1 className="sr-only">{site.nameHi} — {site.name}</h1>
        <div aria-hidden="true" className="flex justify-between overflow-hidden font-sans text-[10.8vw] leading-[0.82] font-extrabold tracking-[-0.055em] text-ink md:text-[10.4vw]">
          {WORD.split(" ").map((word, w) => (
            <span key={word} className="inline-block animate-[rise_1.3s_cubic-bezier(0.16,1,0.3,1)_both] pb-[0.06em]" style={{ animationDelay: `${0.15 + w * 0.12}s` }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Changing photos of Bihar with the fare search on top */}
      <div className="relative mt-3 min-h-[calc(100svh-9rem)] overflow-hidden bg-ink md:mt-4">
        <Slideshow />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/85 md:bg-gradient-to-r md:from-ink/80 md:via-ink/35 md:to-ink/10" />
        <div className="mist" />

        <div className="relative mx-auto grid max-w-[1500px] gap-8 px-4 pt-8 pb-24 text-ivory md:grid-cols-[1.25fr_420px] md:items-center md:px-10 md:py-16">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-ivory/15 px-4 py-1.5 text-sm font-semibold" data-reveal>
              <span className="size-2 animate-pulse rounded-full bg-[#3ddc84]" />
              <T hi="24 घंटे चालू · अभी बुक करें" en="Open 24 hours · Book now" />
            </p>
            <h2 className="font-display text-[11vw] leading-[1.02] tracking-tight md:text-[4.6vw]" data-split data-split-delay="0.4">
              <T hi="पूरे बिहार में, कहीं भी — एक कॉल पर गाड़ी।" en="Anywhere in Bihar — a car with one call." />
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ivory/90 md:text-xl" data-reveal data-reveal-delay="0.6">
              <T
                hi="साफ़ गाड़ी, GPS, तय किराया। पटना लोकल से लेकर परिवार की तीर्थ यात्रा तक।"
                en="Clean GPS-enabled cars and fixed fares — from a Patna local drop to a family pilgrimage."
              />
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-reveal data-reveal-delay="0.8">
              <a href={telLink} className="flex items-center gap-3 rounded-full bg-sindoor px-7 py-4 text-lg font-bold text-ivory shadow-lg transition-transform hover:scale-105">
                <PhoneIcon /> <T hi="अभी कॉल करें" en="Call now" />
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-full bg-[#1f8f4e] px-7 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105">
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
            <p className="mt-4 text-lg font-semibold tracking-wide text-ivory/90" data-reveal data-reveal-delay="0.9">📞 {site.phone}</p>
          </div>
          <div data-reveal data-reveal-delay="0.5">
            <FareSearch />
          </div>
        </div>
      </div>
      <style>{`@keyframes rise{from{transform:translateY(105%)}to{transform:none}}`}</style>
    </section>
  );
}
