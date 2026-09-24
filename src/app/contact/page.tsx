import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BookingForm } from "@/components/BookingForm";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or WhatsApp ${site.phone} to book a cab in Patna or anywhere in Bihar. ${site.address.line1}, ${site.address.city} ${site.address.pin}.`,
};

const mapQuery = encodeURIComponent(`${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}`);

export default function Contact() {
  const cards = [
    { k: "Call us", v: site.phone, href: telLink },
    { k: "WhatsApp", v: "Chat now →", href: waLink() },
    { k: "Email us", v: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" hi="संपर्क करें" title={<>Say <em>namaste</em></>}>
        Planning a trip from Patna? Reach us any time for cab bookings, tour packages and custom travel plans — we&apos;re on the road 24×7.
      </PageHeader>
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <a key={c.k} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="group rounded-[1.75rem] border border-ink/15 p-8 transition-colors hover:bg-ink hover:text-ivory" data-reveal>
              <p className="eyebrow text-ink/50 group-hover:text-ivory/60">{c.k}</p>
              <p className="mt-4 font-display text-2xl break-all md:text-3xl">{c.v}</p>
            </a>
          ))}
        </div>
        <div className="mx-auto mt-5 grid max-w-[1400px] gap-5 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-[1.75rem] bg-ink p-8 text-ivory" data-reveal>
            <p className="eyebrow text-ivory/50">Find us at</p>
            <address className="mt-4 font-display text-3xl leading-snug not-italic">
              {site.address.line1},<br />
              {site.address.city} {site.address.pin}
            </address>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener" className="eyebrow mt-8 inline-block rounded-full bg-sindoor px-6 py-3.5">
              Open in Google Maps
            </a>
          </div>
          <div className="min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-ink/15" data-reveal>
            <iframe
              title="Map to our Patna office"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full min-h-[22rem] w-full grayscale-[60%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <BookingForm />
    </>
  );
}
