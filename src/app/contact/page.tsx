import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BookingForm } from "@/components/BookingForm";
import { site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "संपर्क · Contact",
  description: `कॉल या WhatsApp करें ${site.phone} — पटना और पूरे बिहार में गाड़ी बुक करें। Call or WhatsApp to book a cab. ${site.address.line1.en}, ${site.address.city.en} ${site.address.pin}.`,
};

const mapQuery = encodeURIComponent(`${site.address.line1.en}, ${site.address.city.en}, ${site.address.state.en} ${site.address.pin}`);

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow={<T hi="संपर्क करें" en="Contact" />} title={<T hi="नमस्ते! बात कीजिए" en="Say namaste" />}>
        <T
          hi="पटना से कहीं जाना है? गाड़ी बुकिंग, टूर पैकेज या कोई भी सवाल — हम 24 घंटे आपके लिए हैं।"
          en="Planning a trip from Patna? Reach us any time for cab bookings, tour packages and custom travel plans — we're on the road 24×7."
        />
      </PageHeader>
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
          <a href={telLink} className="flex flex-col gap-3 rounded-[1.75rem] bg-sindoor p-8 text-ivory transition-transform hover:-translate-y-1" data-reveal>
            <PhoneIcon className="size-9" />
            <span className="text-lg font-semibold opacity-85"><T hi="कॉल करें" en="Call us" /></span>
            <span className="font-display text-3xl">{site.phone}</span>
          </a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 rounded-[1.75rem] bg-[#1f8f4e] p-8 text-white transition-transform hover:-translate-y-1" data-reveal>
            <WhatsAppIcon className="size-9" />
            <span className="text-lg font-semibold opacity-85">WhatsApp</span>
            <span className="font-display text-3xl"><T hi="मैसेज भेजें →" en="Chat now →" /></span>
          </a>
          <a href={`mailto:${site.email}`} className="flex flex-col gap-3 rounded-[1.75rem] border-2 border-ink/15 p-8 transition-transform hover:-translate-y-1" data-reveal>
            <span className="text-3xl" aria-hidden="true">✉</span>
            <span className="text-lg font-semibold text-ink/70"><T hi="ईमेल" en="Email us" /></span>
            <span className="font-display text-2xl break-all">{site.email}</span>
          </a>
        </div>
        <div className="mx-auto mt-4 grid max-w-[1400px] gap-4 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-[1.75rem] bg-ink p-8 text-ivory" data-reveal>
            <PinIcon className="size-9 text-turmeric" />
            <p className="mt-3 font-semibold text-ivory/70"><T hi="हमारा पता" en="Find us at" /></p>
            <address className="mt-2 font-display text-3xl leading-snug not-italic">
              <T b={site.address.line1} />,<br />
              <T b={site.address.city} /> {site.address.pin}
            </address>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block rounded-full bg-sindoor px-6 py-3.5 font-bold">
              <T hi="Google Maps में खोलें" en="Open in Google Maps" />
            </a>
          </div>
          <div className="min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-ink/15" data-reveal>
            <iframe title="Map" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} className="h-full min-h-[22rem] w-full" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-popups" />
          </div>
        </div>
      </section>
      <BookingForm />
    </>
  );
}
