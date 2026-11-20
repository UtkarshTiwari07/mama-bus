import { site } from "@/content/site";
import { cities, inr, routes, routeTitle } from "@/content/routes";

export const dynamic = "force-static";

// A plain-text summary for AI assistants and answer engines (llmstxt.org), built from the same data as the pages.
export function GET() {
  const a = site.address;
  const body = `# ${site.name} (${site.nameHi})

> ${site.tagline.en}. Patna-based taxi and tour operator with fixed fares across Bihar and to Uttar Pradesh, open 24×7. Booking is by phone or WhatsApp.

- Phone / WhatsApp: ${site.phone}
- Email: ${site.email}
- Address: ${a.line1.en}, ${a.city.en}, ${a.state.en} ${a.pin}, India
- Cars: 5-seat sedan (Maruti Dzire or similar), 7-seat Maruti Ertiga, 7-seat Toyota Innova Crysta
- Services: local taxi, outstation one-way and round trips, airport and railway station transfers, tour packages, pilgrimage tours

## Pages

- [Home](${site.url}/): fare search, interactive Bihar map, fleet, services
- [All routes and fares](${site.url}/routes/)
- [About](${site.url}/about/)
- [Contact](${site.url}/contact/)

## Fixed fares (one way or round trip, confirm on WhatsApp)

${routes.map((r) => `- [${routeTitle(r)}](${site.url}/routes/${r.slug}/): ${r.small.seats}-seater ${inr(r.small.fare)}, 7-seater ${inr(r.large.fare)}. ${r.blurb.en}`).join("\n")}

Cities with fixed fares: ${[...new Set(routes.flatMap((r) => [r.from, r.to]))].map((k) => cities[k].name).join(", ")}.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
