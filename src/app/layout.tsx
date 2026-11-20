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
import { LangProvider } from "@/i18n/LangProvider";
import { businessJsonLd, jsonLdHtml } from "@/lib/schema";

// Fewer font files: Fraunces on its default axes, Mukta in two weights, Tiro upright only.
// Only the two faces used above the fold are preloaded.
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap", preload: false });
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const mukta = Mukta({ subsets: ["devanagari"], weight: ["400", "700"], variable: "--font-mukta", display: "swap" });
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari"], weight: "400", variable: "--font-tiro", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Keep titles near 60 characters so search results don't truncate them.
  title: {
    default: `${site.name} — Patna taxi across Bihar | पटना टैक्सी`,
    template: `%s · ${site.short} Travels`,
  },
  description: "पटना की भरोसेमंद टैक्सी — पूरे बिहार और यूपी का तय किराया, 24×7 बुकिंग। Patna cabs: one-way, round trip, airport and pilgrimage trips.",
  // "./" resolves to each page's own URL, so every page declares itself canonical.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    url: "./",
    siteName: site.name,
    images: ["/images/hero/ganga-ghat.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#16302a",
};


// Hides [data-reveal] elements until GSAP takes over; falls back to visible if it never does.
const bootScript = `document.documentElement.classList.add('js');try{if(localStorage.getItem('avni-lang')==='en')document.documentElement.lang='en'}catch(e){}try{if(sessionStorage.getItem('avni-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('motion'))d.classList.remove('js')},2500);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${fraunces.variable} ${inter.variable} ${mukta.variable} ${tiro.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(businessJsonLd) }} />
      </head>
      <body>
        <LangProvider>
          <Preloader />
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
          <BottomBar />
          <Motion />
        </LangProvider>
      </body>
    </html>
  );
}
