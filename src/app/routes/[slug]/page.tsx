import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, inr, routes, routeTitle } from "@/content/routes";
import { fleet } from "@/content/fleet";
import { telLink, waLink } from "@/lib/whatsapp";
import { haversineKm } from "@/lib/geo";
import { RouteMap } from "@/components/RouteMap";
import { RouteGrid } from "@/components/RouteGrid";
import { TrustStrip } from "@/components/TrustStrip";
import { HowToBook } from "@/components/HowToBook";
import { PhoneIcon, Seats, WhatsAppIcon } from "@/components/Icons";
import { T } from "@/i18n/T";

export const dynamicParams = false;
export const generateStaticParams = () => routes.map((r) => ({ slug: r.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return {};
  const f = cities[route.from];
  const t = cities[route.to];
  return {
    title: `${f.hi} से ${t.hi} टैक्सी ${inr(route.small.fare)} · ${routeTitle(route)} cab`,
    description: `${f.hi} से ${t.hi}: ${route.small.seats} सीट ${inr(route.small.fare)}, 7 सीट ${inr(route.large.fare)}। ${routeTitle(route)} taxi — one way or round trip, 24×7.`,
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) notFound();
  const from = cities[route.from];
  const to = cities[route.to];
  const km = Math.round(haversineKm(from.lonlat, to.lonlat));
  const others = routes.filter((r) => r.slug !== route.slug && (r.from === route.from || r.to === route.to || r.from === route.to || r.to === route.from)).slice(0, 6);
  const fares = [
    { ...route.small, car: fleet[0] },
    { ...route.large, car: fleet[1] },
  ];

  return (
    <>
      <section className="px-4 pt-32 pb-16 md:px-8 md:pt-44">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Link href="/routes/" className="mb-6 inline-block font-semibold text-ink/65 hover:text-sindoor">← <T hi="सभी रूट" en="All routes" /></Link>
            <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight md:text-[6rem]" data-split>
              <T hi={`${from.hi} से ${to.hi}`} en={`${from.name} to ${to.name}`} />
            </h1>
            <p className="mt-6 max-w-xl text-xl text-ink/85" data-reveal><T b={route.blurb} /></p>
            <p className="mt-3 text-ink/65"><T hi={`सीधी दूरी लगभग ${km} किमी · एक तरफ़ या आना-जाना`} en={`≈ ${km} km as the crow flies · one way or round trip`} /></p>
            <div className="mt-7 flex flex-wrap gap-3" data-reveal>
              <a href={telLink} className="flex items-center gap-2 rounded-full bg-sindoor px-6 py-4 text-lg font-bold text-ivory"><PhoneIcon /> <T hi="कॉल करें" en="Call" /></a>
              <a href={waLink(`नमस्ते, मुझे ${from.hi} से ${to.hi} के लिए गाड़ी बुक करनी है।`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#1f8f4e] px-6 py-4 text-lg font-bold text-white"><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
          <div data-reveal>
            <RouteMap from={route.from} to={route.to} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-2">
          {fares.map((f) => (
            <article key={f.seats} className="group relative overflow-hidden rounded-[2rem] bg-ink text-ivory transition-transform duration-500 hover:-translate-y-1.5" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${f.car.image}-1200.webp`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              <div className="relative flex min-h-[21rem] flex-col justify-end p-7 md:p-10">
                <p className="flex items-center gap-2 text-lg font-semibold text-turmeric"><Seats n={f.seats} /> {f.seats} <T hi="सीट वाली गाड़ी" en="seater" /></p>
                <p className="mt-2 font-display text-6xl tabular-nums md:text-7xl">{inr(f.fare)}</p>
                <p className="mt-2 text-ivory/80"><T hi="तय किराया। एक तरफ़ या आना-जाना — WhatsApp पर पक्का करें।" en="Fixed fare. One way or round trip — confirm on WhatsApp." /></p>
                <a
                  href={waLink(`नमस्ते, मुझे ${from.hi} से ${to.hi} के लिए ${f.seats} सीट वाली गाड़ी बुक करनी है (${inr(f.fare)}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 self-start animate-[nudge_2.4s_ease-in-out_infinite] rounded-full bg-sindoor px-7 py-4 text-lg font-bold transition-colors hover:bg-ivory hover:text-ink"
                >
                  <T hi={`${f.seats} सीट बुक करें`} en={`Book ${f.seats} seater`} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <style>{`@keyframes nudge{0%,100%{transform:none}50%{transform:scale(1.04)}}@media (prefers-reduced-motion: reduce){[class*="animate-[nudge"]{animation:none}}`}</style>
      </section>

      <TrustStrip dark />
      <HowToBook />
      {others.length > 0 && <RouteGrid list={others} heading={false} search={false} />}
    </>
  );
}
