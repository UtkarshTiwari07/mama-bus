import map from "@/content/bihar-map.json";
import { cities, findRoute, inr, type CityKey } from "@/content/routes";
import type { Bi } from "@/i18n/LangProvider";

export type Place = {
  id: string;
  name: Bi;
  x: number;
  y: number;
  lonlat: readonly number[];
  group: "served" | "bihar" | "up";
  onMap: boolean;
};

// A served city stands in for the district it sits in.
export const DISTRICT_CITY: Record<string, CityKey> = {
  Patna: "patna",
  Gaya: "gaya",
  Darbhanga: "darbhanga",
  Muzaffarpur: "muzaffarpur",
  Siwan: "siwan",
  "East Champaran": "motihari",
  Bhagalpur: "bhagalpur",
  Katihar: "katihar",
  Purnia: "purniya",
  Aurangabad: "aurangabad",
};

// Hindi names for the 28 districts that have no served city.
const DISTRICT_HI: Record<string, string> = {
  Araria: "अररिया", Arwal: "अरवल", Banka: "बांका", Begusarai: "बेगूसराय", Bhojpur: "भोजपुर (आरा)", Buxar: "बक्सर",
  Gopalganj: "गोपालगंज", Jamui: "जमुई", Jehanabad: "जहानाबाद", Kaimur: "कैमूर (भभुआ)", Khagaria: "खगड़िया",
  Kishanganj: "किशनगंज", Lakhisarai: "लखीसराय", Madhepura: "मधेपुरा", Madhubani: "मधुबनी", Munger: "मुंगेर",
  Nalanda: "नालंदा", Nawada: "नवादा", Rohtas: "रोहतास (सासाराम)", Saharsa: "सहरसा", Samastipur: "समस्तीपुर",
  Saran: "सारण (छपरा)", Sheikhpura: "शेखपुरा", Sheohar: "शिवहर", Sitamarhi: "सीतामढ़ी", Supaul: "सुपौल",
  Vaishali: "वैशाली (हाजीपुर)", "West Champaran": "पश्चिमी चंपारण (बेतिया)",
};

// Quote-only destinations in Uttar Pradesh (not drawn on the Bihar map).
const UP_EXTRA = [
  { id: "up-ayodhya", name: { hi: "अयोध्या", en: "Ayodhya" }, lonlat: [82.199, 26.799] },
  { id: "up-prayagraj", name: { hi: "प्रयागराज", en: "Prayagraj" }, lonlat: [81.846, 25.435] },
  { id: "up-kushinagar", name: { hi: "कुशीनगर", en: "Kushinagar" }, lonlat: [83.889, 26.741] },
  { id: "up-lucknow", name: { hi: "लखनऊ", en: "Lucknow" }, lonlat: [80.946, 26.847] },
] as const;

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const PLACES: Record<string, Place> = {
  ...Object.fromEntries(
    Object.entries(cities).map(([id, c]) => [
      id,
      { id, name: { hi: c.hi, en: c.name }, x: c.x, y: c.y, lonlat: c.lonlat, group: "outside" in c ? "up" : "served", onMap: true } satisfies Place,
    ]),
  ),
  ...Object.fromEntries(
    map.districts
      .filter((d) => !DISTRICT_CITY[d.name])
      .map((d) => {
        const id = `d-${slug(d.name)}`;
        return [id, { id, name: { hi: DISTRICT_HI[d.name] ?? d.name, en: d.name }, x: d.cx, y: d.cy, lonlat: [d.lon, d.lat], group: "bihar", onMap: true } satisfies Place];
      }),
  ),
  ...Object.fromEntries(UP_EXTRA.map((u) => [u.id, { ...u, x: 0, y: 0, group: "up", onMap: false } satisfies Place])),
};

export const districtPlace = (name: string) => DISTRICT_CITY[name] ?? `d-${slug(name)}`;

export const placeGroups = (lang: "hi" | "en") => {
  const sort = (a: Place, b: Place) => a.name[lang].localeCompare(b.name[lang], lang);
  const all = Object.values(PLACES);
  return [
    { label: { hi: "ज़्यादा बुक होने वाले शहर", en: "Most-booked cities" }, places: all.filter((p) => p.group === "served").sort(sort) },
    { label: { hi: "बिहार के बाकी ज़िले", en: "Other districts of Bihar" }, places: all.filter((p) => p.group === "bihar").sort(sort) },
    { label: { hi: "उत्तर प्रदेश", en: "Uttar Pradesh" }, places: all.filter((p) => p.group === "up").sort(sort) },
  ];
};

/** Fare lookup plus a ready-to-send WhatsApp message for any two places. */
export function quote(from: string, to: string, size: "small" | "large", lang: "hi" | "en") {
  const a = PLACES[from];
  const b = PLACES[to];
  const route = findRoute(from, to);
  const fare = route ? route[size] : null;
  const message = fare
    ? lang === "hi"
      ? `नमस्ते, मुझे ${a.name.hi} से ${b.name.hi} के लिए ${fare.seats} सीट वाली गाड़ी बुक करनी है (${inr(fare.fare)}).`
      : `Hello, I want to book a ${fare.seats} seater cab from ${a.name.en} to ${b.name.en} (${inr(fare.fare)}).`
    : lang === "hi"
      ? `नमस्ते, मुझे ${a.name.hi} से ${b.name.hi} जाने के लिए गाड़ी का किराया जानना है।`
      : `Hello, I'd like a quote for a cab from ${a.name.en} to ${b.name.en}.`;
  return { a, b, route, fare, message };
}
