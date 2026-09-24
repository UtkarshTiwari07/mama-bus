import Link from "next/link";
import { telLink, waLink } from "@/lib/whatsapp";
import { T } from "@/i18n/T";
import { PhoneIcon, RupeeIcon, TempleIcon, WhatsAppIcon } from "./Icons";

const tile = "group flex flex-col items-center justify-center gap-3 rounded-[1.5rem] p-5 text-center transition-transform duration-300 hover:-translate-y-1 active:scale-95 md:p-8";

export function QuickActions() {
  const actions = [
    { href: telLink, icon: <PhoneIcon className="size-8" />, hi: "कॉल करें", en: "Call us", sub: { hi: "सीधे बात करें", en: "Talk to us directly" }, cls: "bg-sindoor text-ivory", external: false },
    { href: waLink(), icon: <WhatsAppIcon className="size-8" />, hi: "WhatsApp पर बुक करें", en: "Book on WhatsApp", sub: { hi: "मैसेज भेजें", en: "Send a message" }, cls: "bg-[#1f8f4e] text-white", external: true },
    { href: "/#map", icon: <RupeeIcon className="size-8" />, hi: "किराया देखें", en: "Check fares", sub: { hi: "नक्शे पर जगह चुनें", en: "Pick places on the map" }, cls: "bg-ink text-ivory", external: false },
    { href: "/#heritage", icon: <TempleIcon className="size-8" />, hi: "तीर्थ यात्रा", en: "Pilgrimage", sub: { hi: "गया, बोधगया, बनारस…", en: "Gaya, Bodh Gaya, Banaras…" }, cls: "bg-turmeric text-ink", external: false },
  ];
  return (
    <section className="px-4 py-10 md:px-8 md:py-16" aria-label="Quick actions">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {actions.map((a, i) => {
          const inner = (
            <>
              <span className="flex size-16 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">{a.icon}</span>
              <span className="text-lg leading-tight font-bold md:text-xl"><T hi={a.hi} en={a.en} /></span>
              <span className="text-sm opacity-80"><T b={a.sub} /></span>
            </>
          );
          return a.href.startsWith("/") ? (
            <Link key={a.en} href={a.href} className={`${tile} ${a.cls}`} data-reveal data-reveal-delay={String(i * 0.08)}>{inner}</Link>
          ) : (
            <a key={a.en} href={a.href} target={a.external ? "_blank" : undefined} rel="noopener noreferrer" className={`${tile} ${a.cls}`} data-reveal data-reveal-delay={String(i * 0.08)}>{inner}</a>
          );
        })}
      </div>
    </section>
  );
}
