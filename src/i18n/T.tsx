import type { Bi } from "./LangProvider";
import { LangToggle } from "./LangToggle";

/**
 * Inline bilingual text. Both languages are rendered and CSS shows the one
 * matching <html lang>, so switching never re-renders or remounts the page.
 */
export function T({ hi, en, b }: Partial<Bi> & { b?: Bi }) {
  const pair = b ?? { hi: hi ?? "", en: en ?? "" };
  if (pair.hi === pair.en) return <>{pair.hi}</>;
  return (
    <>
      <span lang="hi" className="l-hi">{pair.hi}</span>
      <span lang="en" className="l-en">{pair.en}</span>
    </>
  );
}

export { LangToggle };
