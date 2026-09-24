import { Hero } from "@/components/Hero";
import { QuickActions } from "@/components/QuickActions";
import { TrustStrip } from "@/components/TrustStrip";
import { BiharMap } from "@/components/BiharMap";
import { HowToBook } from "@/components/HowToBook";
import { Fleet } from "@/components/Fleet";
import { RouteGrid } from "@/components/RouteGrid";
import { Services } from "@/components/Services";
import { Heritage } from "@/components/Heritage";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { BookingForm } from "@/components/BookingForm";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickActions />
      <BiharMap />
      <HowToBook />
      <RouteGrid />
      <Fleet />
      <Stats />
      <Services />
      <Heritage />
      <Testimonials />
      <Faq />
      <BookingForm />
    </>
  );
}
