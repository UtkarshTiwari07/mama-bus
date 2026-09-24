import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", axes: ["opsz", "SOFT"] });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400", style: ["normal", "italic"], variable: "--font-tiro" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Taxi & Tours across Bihar`,
    template: `%s · ${site.short} Tour & Travels`,
  },
  description:
    "Patna-based cab and tour service. One-way and round-trip taxis, outstation rides, airport and station transfers, and pilgrimage tours across Bihar — fixed fares, 24×7, book on WhatsApp.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: ["/images/hero/ganga-ghat.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#16302a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: site.name,
  url: site.url,
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  areaServed: "Bihar, India",
  provider: {
    "@type": "LocalBusiness",
    name: site.name,
    telephone: `+${site.phoneRaw}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 00:00-23:59",
  },
};

// Hides [data-reveal] elements until GSAP takes over; falls back to visible if it never does.
const bootScript = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('ssb-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('motion'))d.classList.remove('js')},2500);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${tiro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain">
        <Preloader />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <Motion />
      </body>
    </html>
  );
}
