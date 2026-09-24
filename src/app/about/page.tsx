import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { site } from "@/content/site";
import { FishPair, Lotus } from "@/components/Madhubani";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a Patna-based tour and travel service for local, outstation, family, group, corporate and pilgrimage journeys across Bihar.`,
};

const offerings = [
  "Patna local cab service",
  "Patna airport transfer",
  "Patna outstation cabs",
  "Tour packages from Patna",
  "Family tours",
  "Religious tours",
  "Group transportation",
  "Car rental",
  "Bihar sightseeing tours",
];

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About us" hi="आपकी यात्रा, हमारी ज़िम्मेदारी" title={<>Your journey, <em>our responsibility</em></>}>
        A reliable, customer-focused tour and travel service from Patna — for individuals, families, groups and corporate travellers.
      </PageHeader>

      <section className="px-4 pb-24 md:px-8 md:pb-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/heritage/golghar.webp" alt="Golghar, Patna" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6 text-lg text-ink/75 lg:pt-10">
            <p className="font-display text-3xl leading-snug text-ink md:text-4xl" data-reveal>
              Travel isn&apos;t just about reaching a destination — it&apos;s the <em>journey</em>, the new places and the memories along the way.
            </p>
            <p data-reveal>
              From a short drop inside Patna to a long family tour, we plan around your destination, dates, number of passengers, budget and any special needs, so the trip is stress-free from pickup to drop.
            </p>
            <p data-reveal>
              Based on Gola Road in Patna, we know what travellers from the city and nearby areas need — and we cover the whole of Bihar and beyond.
            </p>
            <ul className="grid gap-x-6 gap-y-2 pt-4 sm:grid-cols-2" data-reveal>
              {offerings.map((o) => (
                <li key={o} className="flex items-center gap-3 border-b border-ink/10 py-2 text-base">
                  <span className="size-1.5 rounded-full bg-sindoor" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ivory-2 px-4 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2">
          {[
            { icon: <FishPair className="size-16 text-terracotta" />, title: "Our mission", hi: "हमारा लक्ष्य", body: "To provide reliable, comfortable and affordable travel with a positive experience for every customer — and to make trip planning easier by bringing every travel need under one roof." },
            { icon: <Lotus className="h-14 text-terracotta" />, title: "Our vision", hi: "हमारी सोच", body: "To be the trusted tour and travel name in Patna and across Bihar, known for quality service, reliability and professional travel assistance — and for long relationships with the people we drive." },
          ].map((c) => (
            <article key={c.title} className="rounded-[2rem] bg-ivory p-8 md:p-12" data-reveal>
              {c.icon}
              <p className="hindi mt-8 text-2xl text-sindoor">{c.hi}</p>
              <h2 className="mt-1 font-display text-4xl md:text-5xl">{c.title}</h2>
              <p className="mt-5 text-lg text-ink/70">{c.body}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.promises.map((p) => (
            <div key={p.title} className="border-t border-ink/20 pt-6" data-reveal>
              <h3 className="font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Stats />
    </>
  );
}
