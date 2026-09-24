export const heritage = [
  { name: { hi: "बोधगया", en: "Bodh Gaya" }, note: { hi: "महाबोधि मंदिर", en: "Mahabodhi Temple" }, image: "/images/heritage/bodh-gaya-1200.webp" },
  { name: { hi: "नालंदा", en: "Nalanda" }, note: { hi: "प्राचीन विश्वविद्यालय", en: "Ancient Mahavihara" }, image: "/images/heritage/nalanda-1200.webp" },
  { name: { hi: "पटना", en: "Patna" }, note: { hi: "गोलघर", en: "Golghar" }, image: "/images/heritage/golghar-1200.webp" },
  { name: { hi: "राजगीर", en: "Rajgir" }, note: { hi: "विश्व शांति स्तूप", en: "Vishwa Shanti Stupa" }, image: "/images/heritage/rajgir-1200.webp" },
  { name: { hi: "वैशाली", en: "Vaishali" }, note: { hi: "अशोक स्तंभ", en: "Ashokan Pillar" }, image: "/images/heritage/vaishali-1200.webp" },
  { name: { hi: "गया", en: "Gaya" }, note: { hi: "विष्णुपद मंदिर", en: "Vishnupad Temple" }, image: "/images/heritage/gaya-1200.webp" },
  { name: { hi: "केसरिया", en: "Kesariya" }, note: { hi: "बौद्ध स्तूप", en: "Buddhist Stupa" }, image: "/images/hero/kesariya-1200.webp" },
  { name: { hi: "सासाराम", en: "Sasaram" }, note: { hi: "शेरशाह का मक़बरा", en: "Sher Shah Suri's Tomb" }, image: "/images/hero/sasaram-1200.webp" },
  { name: { hi: "बनारस", en: "Banaras" }, note: { hi: "गंगा घाट", en: "The Ghats" }, image: "/images/heritage/varanasi-1200.webp" },
] as const;

/** Hero slideshow — wide photos of Bihar (and the Banaras ghats), with a caption each. */
export const slides = [
  { src: "/images/hero/ganga-ghat", caption: { hi: "गांधी सेतु, पटना", en: "Gandhi Setu, Patna" } },
  { src: "/images/hero/kesariya", caption: { hi: "केसरिया स्तूप, पूर्वी चंपारण", en: "Kesariya Stupa, East Champaran" } },
  { src: "/images/hero/sasaram", caption: { hi: "शेरशाह का मक़बरा, सासाराम", en: "Sher Shah Suri's Tomb, Sasaram" } },
  { src: "/images/heritage/rajgir", caption: { hi: "विश्व शांति स्तूप, राजगीर", en: "Vishwa Shanti Stupa, Rajgir" } },
  { src: "/images/heritage/vaishali", caption: { hi: "अशोक स्तंभ, वैशाली", en: "Ashokan Pillar, Vaishali" } },
  { src: "/images/heritage/varanasi", caption: { hi: "गंगा घाट, बनारस", en: "The ghats, Banaras" } },
] as const;
