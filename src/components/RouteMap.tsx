import map from "@/content/bihar-map.json";
import { cities, type CityKey } from "@/content/routes";

// Static mini-map for a single route page.
export function RouteMap({ from, to }: { from: CityKey; to: CityKey }) {
  const a = cities[from];
  const b = cities[to];
  const mx = (a.x + b.x) / 2 - (b.y - a.y) * 0.25;
  const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.25;
  return (
    <svg viewBox={`0 0 ${map.width} ${map.height}`} className="h-auto w-full" role="img" aria-label={`Map of Bihar showing ${a.name} to ${b.name}`}>
      {map.districts.map((d) => (
        <path key={d.name} d={d.d} className="fill-ink/[0.06]" stroke="rgb(22 48 42 / 0.25)" strokeWidth="0.8" />
      ))}
      <path d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`} fill="none" stroke="#b3362b" strokeWidth="3" strokeLinecap="round" data-draw="" />
      {[a, b].map((c, i) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r="14" className={i ? "fill-turmeric/30" : "fill-sindoor/25"} />
          <circle cx={c.x} cy={c.y} r="6" className={i ? "fill-turmeric" : "fill-sindoor"} />
          <text x={c.x + 16} y={c.y + 5} className="fill-ink text-[16px] font-semibold tracking-[0.14em] uppercase">{c.name}</text>
        </g>
      ))}
    </svg>
  );
}
