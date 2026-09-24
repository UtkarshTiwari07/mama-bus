import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { BottomBar } from "@/components/BottomBar";
import { LangMain, LangProvider } from "@/i18n/LangProvider";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", axes: ["opsz", "SOFT"] });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const mukta = Mukta({ subsets: ["devanagari", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-mukta" });
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400", style: ["normal", "italic"], variable: "--font-tiro" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nameHi} — पटना से पूरे बिहार की टैक्सी | ${site.name}`,
    template: `%s · ${site.short} Tour & Travels`,
  },
  description:
    "पटना की भरोसेमंद टैक्सी सेवा — पूरे बिहार और यूपी के लिए तय किराया, 24×7, एक कॉल या WhatsApp पर बुकिंग। Patna cab and tour service: one-way and round-trip taxis, airport and station transfers, pilgrimage tours.",
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
const bootScript = `document.documentElement.classList.add('js');try{if(localStorage.getItem('ssb-lang')==='en')document.documentElement.lang='en'}catch(e){}try{if(sessionStorage.getItem('ssb-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('motion'))d.classList.remove('js')},2500);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${fraunces.variable} ${inter.variable} ${mukta.variable} ${tiro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain">
        <LangProvider>
          <Preloader />
          <Nav />
          <LangMain>{children}</LangMain>
          <Footer />
          <WhatsAppFab />
          <BottomBar />
          <Motion />
        </LangProvider>
      </body>
    </html>
  );
}
