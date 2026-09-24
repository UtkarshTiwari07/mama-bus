export const site = {
  name: "Shri Shyam Baba Tour & Travels",
  short: "Shri Shyam Baba",
  tagline: "Bihar's own, trusted taxi service",
  taglineHi: "दिल से बिहारी",
  url: "https://shrishyambabatravel.in",
  phone: "+91 99344 13606",
  phoneRaw: "919934413606",
  email: "pratikgd0809@gmail.com",
  address: {
    line1: "IAS Colony, Gola Road",
    city: "Patna",
    state: "Bihar",
    pin: "801503",
  },
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61594498850953",
  },
  youtubeId: "V821daR3UcM",
  stats: [
    { value: 10, suffix: "+", label: "Vehicles in the fleet" },
    { value: 1000, suffix: "+", label: "Happy travellers" },
    { value: 2, suffix: "", label: "Branches" },
    { value: 24, suffix: "×7", label: "On the road, always" },
  ],
  promises: [
    { title: "Best price guarantee", body: "Fixed, transparent fares quoted up front. No surge, no surprises at the end of the ride." },
    { title: "Safe & secure", body: "GPS-enabled cars and experienced drivers who know Bihar's roads, day or night." },
    { title: "Clean & sanitised", body: "Every car is cleaned and sanitised before it picks you up." },
    { title: "Local travel desk", body: "A Patna team that plans local, outstation, family, group and pilgrimage trips with you." },
  ],
} as const;

export const nav = [
  { href: "/#map", label: "Map" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/routes/", label: "Routes" },
  { href: "/#services", label: "Services" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;
