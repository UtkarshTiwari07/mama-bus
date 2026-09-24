import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RouteGrid } from "@/components/RouteGrid";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Routes & fixed fares",
  description: "Fixed one-way cab fares from Patna to Gaya, Darbhanga, Muzaffarpur, Banaras, Raxaul and more — 5 seater and 7 seater.",
};

export default function RoutesPage() {
  return (
    <>
      <PageHeader eyebrow="Routes & fares" hi="हर रास्ता, तय किराया" title={<>Fixed fares, <em>no surprises</em></>}>
        Our most-booked routes across Bihar and into Uttar Pradesh. Every route runs one way or round trip, in a 5-seater or a 7-seater.
      </PageHeader>
      <RouteGrid heading={false} />
      <BookingForm />
    </>
  );
}
