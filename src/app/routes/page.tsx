import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RouteGrid } from "@/components/RouteGrid";
import { TrustStrip } from "@/components/TrustStrip";
import { BookingForm } from "@/components/BookingForm";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "रूट और किराया · Routes & fixed fares",
  description: "पटना से गया, दरभंगा, मुज़फ़्फ़रपुर, बनारस, रक्सौल और कई शहरों का तय किराया — 5 सीट और 7 सीट। Fixed cab fares from Patna across Bihar.",
};

export default function RoutesPage() {
  return (
    <>
      <PageHeader eyebrow={<T hi="रूट और किराया" en="Routes & fares" />} title={<T hi="तय किराया, कोई छुपा चार्ज नहीं" en="Fixed fares, no surprises" />}>
        <T
          hi="बिहार और उत्तर प्रदेश के हमारे सबसे ज़्यादा बुक होने वाले रूट। हर रूट पर एक तरफ़ या आना-जाना, 5 सीट या 7 सीट।"
          en="Our most-booked routes across Bihar and into Uttar Pradesh. Every route runs one way or round trip, in a 5-seater or a 7-seater."
        />
      </PageHeader>
      <TrustStrip />
      <RouteGrid heading={false} />
      <BookingForm />
    </>
  );
}
