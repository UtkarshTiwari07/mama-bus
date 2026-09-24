import map from "./bihar-map.json";

export type CityKey = keyof typeof map.cities;

export type Route = {
  slug: string;
  from: CityKey;
  to: CityKey;
  /** Fare for the smaller car. Katihar → Patna is quoted for a 6-seater. */
  small: { seats: 5 | 6; fare: number };
  large: { seats: 7; fare: number };
  blurb: string;
};

const r = (from: CityKey, to: CityKey, small: number, large: number, blurb: string, smallSeats: 5 | 6 = 5): Route => ({
  slug: `${from}-to-${to}`,
  from,
  to,
  small: { seats: smallSeats, fare: small },
  large: { seats: 7, fare: large },
  blurb,
});

export const routes: Route[] = [
  r("patna", "gaya", 2500, 3500, "The pilgrim's road to Gaya — Vishnupad, Pind Daan and a short hop to Bodh Gaya."),
  r("patna", "darbhanga", 3000, 4000, "North across the Ganga into Mithila, the home of Madhubani art."),
  r("patna", "muzaffarpur", 2000, 3000, "Across the Ganga to the litchi city on the Burhi Gandak."),
  r("patna", "siwan", 2600, 3498, "West through Saran to Siwan, district headquarters on the UP border."),
  r("patna", "banaras", 5000, 5999, "Ganga to Ganga — from Patna's ghats to the ghats of Kashi."),
  r("patna", "raxaul", 5500, 6499, "Up through Champaran to Raxaul, the gateway to Nepal."),
  r("bhagalpur", "patna", 5000, 6000, "Silk city to the capital along the southern bank of the Ganga."),
  r("katihar", "patna", 6500, 7498, "From the junction town of the east across the length of Bihar.", 6),
  r("purniya", "patna", 6500, 7494, "Seemanchal to Patna, a long and easy highway day."),
  r("patna", "aurangabad", 3000, 4500, "South-west to Aurangabad and the Sun temple of Deo."),
  r("motihari", "patna", 3000, 4000, "From Gandhi's Champaran down to the capital."),
  r("katihar", "darbhanga", 4500, 5500, "Across north Bihar, Kosi country to Mithila."),
  r("patna", "gorakhpur", 5000, 6000, "Out of Bihar and into eastern Uttar Pradesh."),
  r("katihar", "muzaffarpur", 6000, 7000, "East to west across the plains of north Bihar."),
  r("aurangabad", "patna", 3500, 4500, "Up from Magadh's southern edge to Patna."),
];

export const cities = map.cities;
export const cityName = (k: CityKey) => map.cities[k].name;
export const routeTitle = (route: Route) => `${cityName(route.from)} to ${cityName(route.to)}`;
export const findRoute = (a: string, b: string) =>
  routes.find((x) => (x.from === a && x.to === b) || (x.from === b && x.to === a));

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
