"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import map from "@/content/bihar-map.json";

// The interactive map (district shapes + planner) downloads only when the
// visitor scrolls near it. Until then a same-size placeholder holds its place.
const BiharMap = dynamic(() => import("./BiharMap"), { ssr: false, loading: () => <Placeholder /> });

function Placeholder() {
  return (
    <section id="map" className="bg-ink px-4 py-20 md:px-8 md:py-32" aria-busy="true">
      <div className="mx-auto max-w-[1100px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bihar-outline-dark.svg" alt="" width={map.width} height={map.height} className="h-auto w-full opacity-70" />
      </div>
    </section>
  );
}

export function BiharMapLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Someone arriving at /#map needs it straight away.
    if (location.hash === "#map") return setShow(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "800px 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{show ? <BiharMap /> : <Placeholder />}</div>;
}
