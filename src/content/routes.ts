import map from "./bihar-map.json";

export type CityKey = keyof typeof map.cities;

export type Route = {
  slug: string;
  from: CityKey;
  to: CityKey;
  /** Fare for the smaller car. Katihar → Patna is quoted for a 6-seater. */
  small: { seats: 5 | 6; fare: number };
  large: { seats: 7; fare: number };
  blurb: { hi: string; en: string };
};

const r = (from: CityKey, to: CityKey, small: number, large: number, hi: string, en: string, smallSeats: 5 | 6 = 5): Route => ({
  slug: `${from}-to-${to}`,
  from,
  to,
  small: { seats: smallSeats, fare: small },
  large: { seats: 7, fare: large },
  blurb: { hi, en },
});

export const routes: Route[] = [
  r("patna", "gaya", 2500, 3500, "गया धाम की राह — विष्णुपद, पिंडदान और पास में बोधगया।", "The pilgrim's road to Gaya — Vishnupad, Pind Daan and a short hop to Bodh Gaya."),
  r("patna", "darbhanga", 3000, 4000, "गंगा पार मिथिला की ओर — मधुबनी कला की धरती।", "North across the Ganga into Mithila, the home of Madhubani art."),
  r("patna", "muzaffarpur", 2000, 3000, "गंगा पार, बूढ़ी गंडक किनारे लीची का शहर।", "Across the Ganga to the litchi city on the Burhi Gandak."),
  r("patna", "siwan", 2600, 3498, "सारण होते हुए पश्चिम में सीवान तक।", "West through Saran to Siwan, district headquarters on the UP border."),
  r("patna", "banaras", 5000, 5999, "गंगा से गंगा तक — पटना के घाट से काशी के घाट।", "Ganga to Ganga — from Patna's ghats to the ghats of Kashi."),
  r("patna", "raxaul", 5500, 6499, "चंपारण होते हुए रक्सौल — नेपाल का दरवाज़ा।", "Up through Champaran to Raxaul, the gateway to Nepal."),
  r("bhagalpur", "patna", 5000, 6000, "सिल्क सिटी से राजधानी तक, गंगा के किनारे-किनारे।", "Silk city to the capital along the southern bank of the Ganga."),
  r("katihar", "patna", 6500, 7498, "पूर्व के जंक्शन शहर से पूरे बिहार को पार करते हुए।", "From the junction town of the east across the length of Bihar.", 6),
  r("purniya", "patna", 6500, 7494, "सीमांचल से पटना — लंबा और आरामदायक हाईवे सफ़र।", "Seemanchal to Patna, a long and easy highway day."),
  r("patna", "aurangabad", 3000, 4500, "दक्षिण-पश्चिम में औरंगाबाद और देव का सूर्य मंदिर।", "South-west to Aurangabad and the Sun temple of Deo."),
  r("motihari", "patna", 3000, 4000, "गांधी जी के चंपारण से राजधानी तक।", "From Gandhi's Champaran down to the capital."),
  r("katihar", "darbhanga", 4500, 5500, "उत्तर बिहार पार — कोसी से मिथिला तक।", "Across north Bihar, Kosi country to Mithila."),
  r("patna", "gorakhpur", 5000, 6000, "बिहार से निकलकर पूर्वी उत्तर प्रदेश तक।", "Out of Bihar and into eastern Uttar Pradesh."),
  r("katihar", "muzaffarpur", 6000, 7000, "उत्तर बिहार के मैदानों में पूर्व से पश्चिम।", "East to west across the plains of north Bihar."),
  r("aurangabad", "patna", 3500, 4500, "मगध के दक्षिणी छोर से पटना तक।", "Up from Magadh's southern edge to Patna."),
];

export const cities = map.cities;
export const cityName = (k: CityKey) => map.cities[k].name;
export const routeTitle = (route: Route) => `${cityName(route.from)} to ${cityName(route.to)}`;
export const findRoute = (a: string, b: string) =>
  routes.find((x) => (x.from === a && x.to === b) || (x.from === b && x.to === a));

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const routeTitleBi = (route: Route) => ({
  hi: `${map.cities[route.from].hi} से ${map.cities[route.to].hi}`,
  en: routeTitle(route),
});
