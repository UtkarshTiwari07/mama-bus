export const site = {
  name: "Shri Shyam Baba Tour & Travels",
  nameHi: "श्री श्याम बाबा टूर एंड ट्रेवल्स",
  short: "Shri Shyam Baba",
  tagline: { hi: "बिहार की अपनी, भरोसेमंद टैक्सी सेवा", en: "Bihar's own, trusted taxi service" },
  taglineHi: "दिल से बिहारी",
  url: "https://shrishyambabatravel.in",
  phone: "+91 99344 13606",
  phoneRaw: "919934413606",
  email: "pratikgd0809@gmail.com",
  address: {
    line1: { hi: "आईएएस कॉलोनी, गोला रोड", en: "IAS Colony, Gola Road" },
    city: { hi: "पटना", en: "Patna" },
    state: { hi: "बिहार", en: "Bihar" },
    pin: "801503",
  },
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61594498850953",
  },
  youtubeId: "V821daR3UcM",
  stats: [
    { value: 10, suffix: "+", label: { hi: "गाड़ियाँ", en: "Vehicles in the fleet" } },
    { value: 1000, suffix: "+", label: { hi: "खुश यात्री", en: "Happy travellers" } },
    { value: 2, suffix: "", label: { hi: "शाखाएँ", en: "Branches" } },
    { value: 24, suffix: "×7", label: { hi: "हर समय सेवा", en: "On the road, always" } },
  ],
  promises: [
    {
      title: { hi: "सबसे सही किराया", en: "Best price guarantee" },
      body: { hi: "किराया पहले ही तय। बाद में कोई छुपा चार्ज नहीं।", en: "Fixed, transparent fares quoted up front. No surprises at the end of the ride." },
    },
    {
      title: { hi: "सुरक्षित सफ़र", en: "Safe & secure" },
      body: { hi: "GPS वाली गाड़ियाँ और बिहार की सड़कें जानने वाले अनुभवी ड्राइवर — दिन हो या रात।", en: "GPS-enabled cars and experienced drivers who know Bihar's roads, day or night." },
    },
    {
      title: { hi: "साफ़-सुथरी गाड़ी", en: "Clean & sanitised" },
      body: { hi: "हर सवारी से पहले गाड़ी साफ़ और सैनिटाइज़ की जाती है।", en: "Every car is cleaned and sanitised before it picks you up." },
    },
    {
      title: { hi: "पटना में अपना दफ़्तर", en: "Local travel desk" },
      body: { hi: "लोकल, बाहर, परिवार, ग्रुप या तीर्थ यात्रा — हमारी टीम आपके साथ प्लान करती है।", en: "A Patna team that plans local, outstation, family, group and pilgrimage trips with you." },
    },
  ],
  trust: [
    { hi: "24×7 सेवा", en: "24×7 service" },
    { hi: "GPS वाली गाड़ी", en: "GPS enabled" },
    { hi: "साफ़ गाड़ी", en: "Clean cars" },
    { hi: "तय किराया", en: "Fixed fares" },
    { hi: "रात में भी सुरक्षित", en: "Safe at night" },
    { hi: "एक कॉल पर बुकिंग", en: "Book with one call" },
    { hi: "पूरा बिहार + यूपी", en: "All of Bihar + UP" },
  ],
} as const;

export const nav = [
  { href: "/#map", label: { hi: "किराया देखें", en: "Fares & map" } },
  { href: "/#fleet", label: { hi: "गाड़ियाँ", en: "Fleet" } },
  { href: "/routes/", label: { hi: "रूट", en: "Routes" } },
  { href: "/#services", label: { hi: "सेवाएँ", en: "Services" } },
  { href: "/about/", label: { hi: "हमारे बारे में", en: "About" } },
  { href: "/contact/", label: { hi: "संपर्क", en: "Contact" } },
] as const;
