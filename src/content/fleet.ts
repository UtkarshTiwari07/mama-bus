export const fleet = [
  {
    key: "sedan",
    name: { hi: "सेडान", en: "Sedan" },
    model: { hi: "मारुति डिज़ायर या इसी तरह की", en: "Maruti Dzire or similar" },
    seats: 5,
    type: { hi: "छोटी गाड़ी", en: "Sedan" },
    image: "/images/fleet/sedan",
    idealFor: { hi: "शहर, एयरपोर्ट-स्टेशन और छोटे परिवार के लिए।", en: "City rides, airport and station drops, couples and small families." },
  },
  {
    key: "ertiga",
    name: { hi: "अर्टिगा", en: "Ertiga" },
    model: { hi: "मारुति अर्टिगा", en: "Maruti Ertiga" },
    seats: 7,
    type: { hi: "बड़ी गाड़ी", en: "MPV" },
    image: "/images/fleet/ertiga",
    idealFor: { hi: "परिवार के टूर, तीर्थ यात्रा और सामान के साथ सफ़र के लिए।", en: "Family tours, pilgrimages and outstation trips with luggage." },
  },
  {
    key: "innova",
    name: { hi: "इनोवा", en: "Innova" },
    model: { hi: "टोयोटा इनोवा क्रिस्टा", en: "Toyota Innova Crysta" },
    seats: 7,
    type: { hi: "बड़ी आरामदायक गाड़ी", en: "Premium MPV" },
    image: "/images/fleet/innova",
    idealFor: { hi: "लंबे हाईवे सफ़र, ग्रुप और ज़्यादा आराम के लिए।", en: "Long highway days, groups and anyone who wants the extra comfort." },
  },
] as const;
