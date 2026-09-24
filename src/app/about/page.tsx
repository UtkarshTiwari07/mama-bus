import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { TrustStrip } from "@/components/TrustStrip";
import { site } from "@/content/site";
import { FishPair, Lotus } from "@/components/Madhubani";
import { CheckIcon } from "@/components/Icons";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "हमारे बारे में · About us",
  description: `${site.nameHi} — पटना की टूर एंड ट्रेवल सेवा। ${site.name} is a Patna-based tour and travel service for local, outstation, family, group and pilgrimage journeys.`,
};

const offerings = [
  { hi: "पटना लोकल कैब", en: "Patna local cab service" },
  { hi: "पटना एयरपोर्ट ट्रांसफ़र", en: "Patna airport transfer" },
  { hi: "पटना से आउटस्टेशन कैब", en: "Patna outstation cabs" },
  { hi: "पटना से टूर पैकेज", en: "Tour packages from Patna" },
  { hi: "परिवार के टूर", en: "Family tours" },
  { hi: "धार्मिक यात्रा", en: "Religious tours" },
  { hi: "ग्रुप के लिए गाड़ी", en: "Group transportation" },
  { hi: "कार किराये पर", en: "Car rental" },
  { hi: "बिहार दर्शन", en: "Bihar sightseeing tours" },
];

export default function About() {
  return (
    <>
      <PageHeader eyebrow={<T hi="हमारे बारे में" en="About us" />} title={<T hi="आपकी यात्रा, हमारी ज़िम्मेदारी" en="Your journey, our responsibility" />}>
        <T
          hi="पटना की भरोसेमंद टूर एंड ट्रेवल सेवा — अकेले यात्री, परिवार, ग्रुप और कंपनी सबके लिए।"
          en="A reliable, customer-focused tour and travel service from Patna — for individuals, families, groups and corporate travellers."
        />
      </PageHeader>
      <TrustStrip />

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/heritage/golghar-1200.webp" alt="Golghar, Patna" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6 text-lg text-ink/85 lg:pt-6">
            <p className="font-display text-3xl leading-snug text-ink md:text-4xl" data-reveal>
              <T hi="सफ़र सिर्फ़ मंज़िल तक पहुँचना नहीं — रास्ता, नई जगहें और यादें भी हैं।" en="Travel isn't just reaching a destination — it's the journey, the new places and the memories along the way." />
            </p>
            <p data-reveal>
              <T
                hi="पटना के अंदर छोटी सवारी हो या परिवार के साथ लंबा टूर — हम आपकी जगह, तारीख़, लोगों की गिनती, बजट और ज़रूरत के हिसाब से प्लान करते हैं।"
                en="From a short drop inside Patna to a long family tour, we plan around your destination, dates, number of passengers, budget and any special needs."
              />
            </p>
            <p data-reveal>
              <T
                hi="हमारा दफ़्तर पटना के गोला रोड पर है। हम पटना और आसपास के यात्रियों की ज़रूरत समझते हैं — और पूरे बिहार व उसके बाहर भी जाते हैं।"
                en="Based on Gola Road in Patna, we know what travellers from the city and nearby areas need — and we cover the whole of Bihar and beyond."
              />
            </p>
            <ul className="grid gap-x-6 gap-y-1 pt-2 sm:grid-cols-2" data-reveal>
              {offerings.map((o) => (
                <li key={o.en} className="flex items-center gap-3 border-b border-ink/10 py-2.5">
                  <CheckIcon className="size-5 shrink-0 text-sindoor" /> <T b={o} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ivory-2 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2">
          {[
            {
              icon: <FishPair className="size-16 text-terracotta" />,
              title: { hi: "हमारा लक्ष्य", en: "Our mission" },
              body: {
                hi: "भरोसेमंद, आरामदायक और सही दाम वाली यात्रा — हर यात्री को अच्छा अनुभव। सफ़र की हर ज़रूरत एक ही जगह।",
                en: "To provide reliable, comfortable and affordable travel with a positive experience for every customer — and every travel need under one roof.",
              },
            },
            {
              icon: <Lotus className="h-14 text-terracotta" />,
              title: { hi: "हमारी सोच", en: "Our vision" },
              body: {
                hi: "पटना और पूरे बिहार में भरोसे का नाम बनना — अच्छी सेवा, भरोसा और यात्रियों के साथ लंबा रिश्ता।",
                en: "To be the trusted tour and travel name in Patna and across Bihar, known for quality service, reliability and long relationships with the people we drive.",
              },
            },
          ].map((c) => (
            <article key={c.title.en} className="rounded-[2rem] bg-ivory p-8 md:p-12" data-reveal>
              {c.icon}
              <h2 className="mt-6 font-display text-4xl md:text-5xl"><T b={c.title} /></h2>
              <p className="mt-4 text-lg text-ink/85"><T b={c.body} /></p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-6 grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.promises.map((p) => (
            <div key={p.title.en} className="rounded-[1.5rem] bg-ivory p-6" data-reveal>
              <h3 className="text-xl font-bold"><T b={p.title} /></h3>
              <p className="mt-2 text-ink/85"><T b={p.body} /></p>
            </div>
          ))}
        </div>
      </section>
      <Stats />
    </>
  );
}
