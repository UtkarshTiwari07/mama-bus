import { site } from "@/content/site";

/** Stable id so per-page schema (route offers) can point back at the one business entity. */
export const businessId = `${site.url}/#business`;

/** Serialise JSON-LD for a <script> tag; `<` is escaped so content can never close the tag. */
export const jsonLdHtml = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": businessId,
  name: site.name,
  alternateName: site.nameHi,
  url: `${site.url}/`,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/images/hero/ganga-ghat.webp`,
  description: "Patna-based taxi and tour operator: one-way and round-trip cabs across Bihar and to Uttar Pradesh, airport and station transfers, pilgrimage tours.",
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1.en,
    addressLocality: site.address.city.en,
    addressRegion: site.address.state.en,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "State", name: "Bihar" },
    { "@type": "State", name: "Uttar Pradesh" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [site.socials.facebook],
};
