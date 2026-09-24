import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import credits from "@/content/credits.json";
import { T } from "@/i18n/T";

export const metadata: Metadata = { title: "Photo credits", robots: { index: false } };

export default function Credits() {
  return (
    <>
      <PageHeader eyebrow="Credits" title={<T hi="फ़ोटो क्रेडिट" en="Photo credits" />}>
        Photographs are from Wikimedia Commons under the licences listed. Vehicle photos show the car models we run and are not photos of our own fleet.
      </PageHeader>
      <section className="px-4 pb-24 md:px-8">
        <ul className="mx-auto max-w-[1400px] border-t border-ink/15">
          {credits.map((c) => (
            <li key={c.file} className="grid gap-4 border-b border-ink/15 py-5 md:grid-cols-[6rem_1fr_auto] md:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.file} alt="" loading="lazy" className="aspect-[4/3] w-24 rounded-lg object-cover" />
              <p>
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="font-display text-xl hover:text-sindoor">{c.title}</a>
                <span className="block text-sm text-ink/60">by {c.author}</span>
              </p>
              <p className="eyebrow text-ink/60">{c.license}</p>
            </li>
          ))}
          <li className="border-b border-ink/15 py-5 text-sm text-ink/70">
            Bihar district boundaries: Census of India 2011, via Datameet and the india-maps-data project.
          </li>
        </ul>
      </section>
    </>
  );
}
