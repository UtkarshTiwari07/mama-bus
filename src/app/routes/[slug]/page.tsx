import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, inr, routes, routeTitle } from "@/content/routes";
import { fleet } from "@/content/fleet";
import { waLink } from "@/lib/whatsapp";
import { haversineKm } from "@/lib/geo";
import { RouteMap } from "@/components/RouteMap";
import { RouteGrid } from "@/components/RouteGrid";

export const dynamicParams = false;
export const generateStaticParams = () => routes.map((r) => ({ slug: r.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return {};
  return {
    title: `${routeTitle(route)} cab — from ${inr(route.small.fare)}`,
    description: `Book a ${routeTitle(route)} taxi: ${route.small.seats} seater ${inr(route.small.fare)}, 7 seater ${inr(route.large.fare)}. One way or round trip, 24×7, clean GPS-enabled cars.`,
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
    { ...route.small, label: route.small.seats === 5 ? "Sedan" : "6 seater", car: fleet[0] },
    { ...route.large, label: "Ertiga / Innova", car: fleet[1] },
  ];

  return (
    <>
      <section className="px-4 pt-36 pb-20 md:px-8 md:pt-48">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Link href="/routes/" className="eyebrow mb-8 inline-block text-ink/55 hover:text-sindoor">← All routes</Link>
            <p className="hindi mb-3 text-3xl text-terracotta md:text-4xl" data-reveal>{from.hi} से {to.hi}</p>
            <h1 className="font-display text-[14vw] leading-[0.88] font-light tracking-tight md:text-[7rem]" data-split>
              {from.name} <em className="text-sindoor">to</em> {to.name}
            </h1>
            <p className="mt-8 max-w-xl text-xl text-ink/75" data-reveal>{route.blurb}</p>
            <p className="eyebrow mt-4 text-ink/45">≈ {km} km as the crow flies · one way or round trip</p>
          </div>
          <div data-reveal>
            <RouteMap from={route.from} to={route.to} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-5 md:grid-cols-2">
          {fares.map((f) => (
            <article key={f.seats} className="group relative overflow-hidden rounded-[2rem] bg-ink text-ivory" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.car.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              <div className="relative flex min-h-[22rem] flex-col justify-end p-7 md:p-10">
                <p className="eyebrow text-turmeric">{f.seats} seater · {f.label}</p>
                <p className="mt-2 font-display text-6xl tabular-nums md:text-7xl">{inr(f.fare)}</p>
                <p className="mt-2 text-ivory/65">Fixed fare. One way or round trip — confirm on WhatsApp.</p>
                <a href={waLink(`Hello, I want to book a ${f.seats} seater from ${from.name} to ${to.name} (${inr(f.fare)}).`)} target="_blank" rel="noopener" className="eyebrow mt-6 self-start rounded-full bg-sindoor px-7 py-4 transition-colors hover:bg-ivory hover:text-ink">
                  Book {f.seats} seater
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {others.length > 0 && <RouteGrid list={others} heading={false} />}
    </>
  );
}
