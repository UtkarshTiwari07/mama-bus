import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { BiharMap } from "@/components/BiharMap";
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
      <Manifesto />
      <BiharMap />
      <Fleet />
      <RouteGrid />
      <Stats />
      <Services />
      <Heritage />
      <Testimonials />
      <Faq />
      <BookingForm />
    </>
  );
}
