# Shri Shyam Baba Tour & Travels — website

A Hindi-first, Bihar-flavoured rebuild of shrishyambabatravel.in: Next.js (static export) with Tailwind CSS v4, GSAP + Lenis motion, a changing photo hero, an interactive map of Bihar's 38 districts, and one-tap Call / WhatsApp booking everywhere.

The site opens in simple Hindi; the हिं / EN switch (nav and the phone bottom bar) flips every page to English and remembers the choice.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/ — upload that folder to any host
```

## Put it online (no server needed)

`npm run build` makes a plain static site in `out/`. Any one of these works:

- **Netlify Drop (easiest, free):** open https://app.netlify.com/drop and drag the `out` folder onto the page. You get a live link in seconds; sign up to keep it and add your own domain.
- **Vercel:** `npx vercel out --prod` and follow the prompts.
- **cPanel / shared hosting (e.g. for shrishyambabatravel.in):** upload everything *inside* `out/` to `public_html/`.
- **GitHub Pages:** push `out/` to a `gh-pages` branch (public repo, or a paid plan for private).

Page URLs end in `/` (e.g. `/routes/patna-to-gaya/`), which every host above serves correctly.

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, stats, socials | `src/content/site.ts` |
| WhatsApp number used by every button | `site.phoneRaw` in `src/content/site.ts` (via `src/lib/whatsapp.ts`) |
| Routes and fares (5 / 7 seater) | `src/content/routes.ts` |
| Fleet cards | `src/content/fleet.ts` |
| Services, heritage places, hero slides, testimonials, FAQ | `src/content/*.ts` |
| Hindi / English text | every content field is a `{ hi, en }` pair; inline text uses `<T hi="…" en="…" />` (`src/i18n/T.tsx`) |
| Place names for the fare pickers (incl. UP destinations) | `src/lib/places.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

Adding a route: add a line to `routes` in `src/content/routes.ts`. If the city is new, add it to `CITIES` in `scripts/build-bihar-map.mjs` and run `npm run map`. A page at `/routes/<from>-to-<to>/` is generated automatically.

## Photos — replace before launch

The photos in `public/images/` are free-licence images from Wikimedia Commons (credits at `/credits/`, stored in `src/content/credits.json`). The car photos show the **models** in the fleet, not the business's own cars.

To use your own photo, save it over the file with the same name (for example `public/images/fleet/ertiga.webp`, about 2000px wide) and delete its entry from `src/content/credits.json`. `npm run images` re-downloads the Commons originals.

## Still needed from the owner

- A native Hindi reader should proofread the Hindi copy once.

- GST number (the old site showed a placeholder) — not displayed until real.
- Years in business — the old site's counter had no value, so it is left out.
- Real fleet photos (see above).

## Map data

`data/bihar-districts.geojson` holds the Census 2011 district boundaries (via Datameet / india-maps-data). `npm run map` projects them into `src/content/bihar-map.json`, so no map library ships to the browser.
