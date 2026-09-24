"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Client-side cooldown for "send" actions (booking form, quote buttons).
 * Stops double-taps and button-mashing from opening WhatsApp again and again.
 * This is anti-spam UX, not security: real rate limiting lives in the Vercel Firewall.
 */
export function useCooldown(ms = 10_000) {
  const until = useRef(0);
  const [cooling, setCooling] = useState(false);
  const run = useCallback(
    (fn: () => void) => {
      const now = Date.now();
      if (now < until.current) return false;
      until.current = now + ms;
      setCooling(true);
      setTimeout(() => setCooling(false), ms);
      fn();
      return true;
    },
    [ms],
  );
  return { run, cooling };
}

/** For plain links: lets the first tap through, swallows repeats inside the window. */
export function useLinkCooldown(ms = 4_000) {
  const last = useRef(0);
  return useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      if (now - last.current < ms) e.preventDefault();
      else last.current = now;
    },
    [ms],
  );
}
