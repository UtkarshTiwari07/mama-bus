import { site } from "@/content/site";

/** The one place the booking number lives. */
export const waLink = (message = "Hello, I want to book a cab.") =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:+${site.phoneRaw}`;
