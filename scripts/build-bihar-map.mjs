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

// Douglas–Peucker in screen space: drops points closer than TOLERANCE px to the line.
// At ~1px on a 1000px-wide map the change is invisible at any size the site shows it.
const TOLERANCE = 1.1;
function simplifyRing(ring) {
  // A closed ring starts and ends on the same point, so split it at the point
  // farthest from the start and simplify the two halves separately.
  if (ring.length < 5) return ring;
  const [x0, y0] = ring[0];
  let far = 1;
  for (let i = 1; i < ring.length; i++) if (Math.hypot(ring[i][0] - x0, ring[i][1] - y0) > Math.hypot(ring[far][0] - x0, ring[far][1] - y0)) far = i;
  return [...simplifyLine(ring.slice(0, far + 1)).slice(0, -1), ...simplifyLine(ring.slice(far))];
}
function simplifyLine(pts) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > TOLERANCE && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}
const r1 = (n) => Math.round(n * 10) / 10;
function pathFor(feature) {
  const polys = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  let d = "";
  for (const poly of polys) {
    for (const ring of poly) {
      const pts = simplifyRing(ring.map((c) => projection(c)));
      if (pts.length < 3) continue;
      d += "M" + pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join("L") + "Z";
    }
  }
  return d;
}
const round = (n) => Math.round(n * 10) / 10;

const districts = geo.features
  .map((f) => {
    const [cx, cy] = toSvg.centroid(f);
    const [lon, lat] = projection.invert([cx, cy]);
    return { name: f.properties.district, d: pathFor(f), cx: round(cx), cy: round(cy), lon: +lon.toFixed(3), lat: +lat.toFixed(3) };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const cities = Object.fromEntries(
  Object.entries(CITIES).map(([slug, c]) => {
    const [x, y] = projection(c.lonlat);
    return [slug, { ...c, x: round(x), y: round(y) }];
  }),
);

// Split so pages that only need place names never download the district shapes.
const out = { width: WIDTH, height: HEIGHT, districts: districts.map(({ d, ...meta }) => meta), cities };
await fs.writeFile(path.join(root, "src/content/bihar-map.json"), JSON.stringify(out));
await fs.writeFile(path.join(root, "src/content/bihar-paths.json"), JSON.stringify(Object.fromEntries(districts.map((d) => [d.name, d.d]))));

// A static outline every page can share from cache (route pages, map placeholder).
const outline = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}"><g fill="#16302a" fill-opacity="0.06" stroke="#16302a" stroke-opacity="0.25" stroke-width="0.8">${districts.map((d) => `<path d="${d.d}"/>`).join("")}</g></svg>`;
await fs.writeFile(path.join(root, "public/bihar-outline.svg"), outline);
const outlineDark = outline.replace('fill="#16302a" fill-opacity="0.06" stroke="#16302a" stroke-opacity="0.25"', 'fill="#f3eee4" fill-opacity="0.06" stroke="#f3eee4" stroke-opacity="0.28"');
await fs.writeFile(path.join(root, "public/bihar-outline-dark.svg"), outlineDark);
console.log(`districts: ${districts.length}, cities: ${Object.keys(cities).length}, meta bytes: ${JSON.stringify(out).length}`);
