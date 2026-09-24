# Shri Shyam Baba Tour & Travels — website

A premium, Bihar-flavoured rebuild of shrishyambabatravel.in: Next.js (static export) with Tailwind CSS v4, GSAP + Lenis motion, an interactive map of Bihar's 38 districts, and WhatsApp booking everywhere.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/ — upload that folder to any host
```

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, stats, socials | `src/content/site.ts` |
| WhatsApp number used by every button | `site.phoneRaw` in `src/content/site.ts` (via `src/lib/whatsapp.ts`) |
| Routes and fares (5 / 7 seater) | `src/content/routes.ts` |
| Fleet cards | `src/content/fleet.ts` |
| Services, heritage places, testimonials, FAQ | `src/content/*.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

Adding a route: add a line to `routes` in `src/content/routes.ts`. If the city is new, add it to `CITIES` in `scripts/build-bihar-map.mjs` and run `npm run map`. A page at `/routes/<from>-to-<to>/` is generated automatically.

## Photos — replace before launch

The photos in `public/images/` are free-licence images from Wikimedia Commons (credits at `/credits/`, stored in `src/content/credits.json`). The car photos show the **models** in the fleet, not the business's own cars.

To use your own photo, save it over the file with the same name (for example `public/images/fleet/ertiga.webp`, about 2000px wide) and delete its entry from `src/content/credits.json`. `npm run images` re-downloads the Commons originals.

## Still needed from the owner

- GST number (the old site showed a placeholder) — not displayed until real.
- Years in business — the old site's counter had no value, so it is left out.
- Real fleet photos (see above).

## Map data

`data/bihar-districts.geojson` holds the Census 2011 district boundaries (via Datameet / india-maps-data). `npm run map` projects them into `src/content/bihar-map.json`, so no map library ships to the browser.
