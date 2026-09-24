import { T } from "@/i18n/T";
import { CarIcon, CheckIcon, PinIcon } from "./Icons";

export function HowToBook() {
  const steps = [
    { icon: <PinIcon className="size-9" />, title: { hi: "जगह बताइए", en: "Tell us where" }, body: { hi: "कॉल या WhatsApp पर — कहाँ से, कहाँ तक और कब।", en: "Call or WhatsApp — from, to and when." } },
    { icon: <CheckIcon className="size-9" />, title: { hi: "किराया पक्का", en: "Fare confirmed" }, body: { hi: "हम तय किराया बताते हैं और बुकिंग पक्की करते हैं।", en: "We tell you the fixed fare and confirm the booking." } },
    { icon: <CarIcon className="size-9" />, title: { hi: "गाड़ी आपके दरवाज़े पर", en: "Car at your door" }, body: { hi: "साफ़ गाड़ी समय पर आपके पते पर पहुँचती है।", en: "A clean car reaches your address on time." } },
  ];
  return (
    <section className="bg-ivory-2 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-4 text-sindoor"><T hi="बहुत आसान" en="Easy as 1-2-3" /></p>
        <h2 className="mb-12 font-display text-[10vw] leading-[1] tracking-tight md:text-[4.2rem]" data-split>
          <T hi="बुकिंग के 3 आसान कदम" en="Book in 3 easy steps" />
        </h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title.en} className="relative overflow-hidden rounded-[1.75rem] bg-ivory p-7 md:p-9" data-reveal data-reveal-delay={String(i * 0.12)}>
              <span className="absolute -top-6 -right-2 font-display text-[9rem] leading-none text-ink/[0.06]" aria-hidden="true">{i + 1}</span>
              <span className="flex size-16 items-center justify-center rounded-2xl bg-sindoor text-ivory">{s.icon}</span>
              <p className="mt-6 text-sm font-bold text-sindoor"><T hi={`कदम ${i + 1}`} en={`Step ${i + 1}`} /></p>
              <h3 className="mt-1 text-2xl font-bold md:text-3xl"><T b={s.title} /></h3>
              <p className="mt-2 text-lg text-ink/80"><T b={s.body} /></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
