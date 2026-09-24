import { site } from "@/content/site";
import { T } from "@/i18n/T";
import { CheckIcon } from "./Icons";

export function TrustStrip({ dark = false }: { dark?: boolean }) {
  const items = [...site.trust, ...site.trust];
  return (
    <div className={`overflow-hidden py-4 ${dark ? "bg-ink text-ivory" : "bg-turmeric text-ink"}`} aria-label="Why travel with us">
      <ul className="marquee gap-8 pr-8" style={{ ["--marquee-duration" as string]: "36s" }}>
        {items.map((t, i) => (
          <li key={i} className="flex shrink-0 items-center gap-2 text-lg font-bold whitespace-nowrap" aria-hidden={i >= site.trust.length}>
            <CheckIcon className="size-5" /> <T b={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
