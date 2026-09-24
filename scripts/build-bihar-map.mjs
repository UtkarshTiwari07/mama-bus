// Projects data/bihar-districts.geojson (Datameet, Census 2011 boundaries)
// into SVG paths so the site ships no map library. Output is committed.
import fs from "node:fs/promises";
import path from "node:path";
import { geoMercator, geoPath } from "d3-geo";

const root = path.resolve(import.meta.dirname, "..");
const geo = JSON.parse(await fs.readFile(path.join(root, "data/bihar-districts.geojson"), "utf8"));

// Cities we serve (lon, lat). Varanasi and Gorakhpur sit in Uttar Pradesh.
const CITIES = {
  patna: { name: "Patna", hi: "पटना", lonlat: [85.137, 25.594] },
  gaya: { name: "Gaya", hi: "गया", lonlat: [85.008, 24.796] },
  darbhanga: { name: "Darbhanga", hi: "दरभंगा", lonlat: [85.897, 26.152] },
  muzaffarpur: { name: "Muzaffarpur", hi: "मुज़फ़्फ़रपुर", lonlat: [85.364, 26.12] },
  siwan: { name: "Siwan", hi: "सीवान", lonlat: [84.36, 26.222] },
  banaras: { name: "Banaras", hi: "बनारस", lonlat: [82.974, 25.318], outside: "UP" },
  raxaul: { name: "Raxaul", hi: "रक्सौल", lonlat: [84.851, 26.981] },
  bhagalpur: { name: "Bhagalpur", hi: "भागलपुर", lonlat: [86.972, 25.244] },
  katihar: { name: "Katihar", hi: "कटिहार", lonlat: [87.571, 25.539] },
  purniya: { name: "Purniya", hi: "पूर्णिया", lonlat: [87.475, 25.778] },
  aurangabad: { name: "Aurangabad", hi: "औरंगाबाद", lonlat: [84.374, 24.752] },
  motihari: { name: "Motihari", hi: "मोतिहारी", lonlat: [84.917, 26.648] },
  gorakhpur: { name: "Gorakhpur", hi: "गोरखपुर", lonlat: [83.373, 26.76], outside: "UP" },
};

const WIDTH = 1000;
const HEIGHT = 620;
const extentShape = {
  type: "FeatureCollection",
  features: [
    ...geo.features,
    { type: "Feature", geometry: { type: "MultiPoint", coordinates: Object.values(CITIES).map((c) => c.lonlat) } },
  ],
};
const projection = geoMercator().fitExtent([[24, 24], [WIDTH - 24, HEIGHT - 24]], extentShape);
const toSvg = geoPath(projection).digits(1);
const round = (n) => Math.round(n * 10) / 10;

const districts = geo.features
  .map((f) => {
    const [cx, cy] = toSvg.centroid(f);
    const [lon, lat] = projection.invert([cx, cy]);
    return { name: f.properties.district, d: toSvg(f), cx: round(cx), cy: round(cy), lon: +lon.toFixed(3), lat: +lat.toFixed(3) };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const cities = Object.fromEntries(
  Object.entries(CITIES).map(([slug, c]) => {
    const [x, y] = projection(c.lonlat);
    return [slug, { ...c, x: round(x), y: round(y) }];
  }),
);

const out = { width: WIDTH, height: HEIGHT, districts, cities };
await fs.writeFile(path.join(root, "src/content/bihar-map.json"), JSON.stringify(out));
console.log(`districts: ${districts.length}, cities: ${Object.keys(cities).length}, bytes: ${JSON.stringify(out).length}`);
