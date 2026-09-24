// Downloads the free-licence photos listed below from Wikimedia Commons,
// converts them to WebP and writes attribution to src/content/credits.json.
// Replace any file in public/images/ with your own photo (same name) and
// delete its entry here to drop the credit.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES = [
  { out: "hero/ganga-ghat.webp", title: "File:The Evening View from Ghandhi Ghat Patna 01.jpg", width: 2400 },
  { out: "hero/gandhi-setu.webp", title: "File:Mahatma Gandhi Setu over River Ganga in Patna, Bihar on the SUPER MOON Night. 23 June..jpg", width: 2400 },
  { out: "hero/kesariya.webp", title: "File:Buddhist Stupa at Kesariya at Champaran (east) district of Bihar, India. 13.jpg", width: 2400 },
  { out: "hero/sasaram.webp", title: "File:Tomb of Sher Shah Suri, Sasaram, Bihar 03.jpg", width: 2400 },
  { out: "fleet/sedan.webp", title: "File:Maruti Suzuki Dzire VXi VVT (front).JPG", width: 2000 },
  { out: "fleet/ertiga.webp", title: "File:2022 Maruti Suzuki Ertiga LXi.jpg", width: 2000 },
  { out: "fleet/innova.webp", title: "File:Toyota Innova Crysta 2.4 Z front right.jpg", width: 2000 },
  { out: "heritage/bodh-gaya.webp", title: "File:Mahabodhi Temple - Moon and Sikhara (9219443947).jpg", width: 1600 },
  { out: "heritage/nalanda.webp", title: "File:Temple 12 - Nalanda Mahavihara (21).jpg", width: 1600 },
  { out: "heritage/golghar.webp", title: "File:Golghar - Patna (1).jpg", width: 1600 },
  { out: "heritage/rajgir.webp", title: "File:Vishwa Shanti Stupa, Rajgir 2.jpg", width: 1600 },
  { out: "heritage/vaishali.webp", title: "File:Ananda Stupa with Ashok lion pillar at vaishali, Bihar 03.jpg", width: 1600 },
  { out: "heritage/gaya.webp", title: "File:Vishnupad temple gaya bihar.jpg", width: 1600 },
  { out: "heritage/varanasi.webp", title: "File:Varanasi 2010 ghats3.jpg", width: 1600 },
];

const UA = { "User-Agent": "ShriShyamBabaSiteBuild/1.0" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function get(url, asJson) {
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers: UA });
    if (res.status === 429) { await sleep(15000 * (i + 1)); continue; }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return asJson ? res.json() : Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`rate limited: ${url}`);
}

const root = path.resolve(import.meta.dirname, "..");
const creditsPath = path.join(root, "src/content/credits.json");
// `node scripts/fetch-images.mjs heritage/gaya.webp` refreshes a single image.
const only = process.argv.slice(2);
const credits = only.length
  ? JSON.parse(await fs.readFile(creditsPath, "utf8")).filter((c) => !only.some((o) => c.file.endsWith(o)))
  : [];
for (const img of IMAGES.filter((i) => !only.length || only.includes(i.out))) {
  const api = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
    action: "query", format: "json", prop: "imageinfo", titles: img.title,
    iiprop: "url|extmetadata", iiurlwidth: String(img.width),
  });
  const page = Object.values((await get(api, true)).query.pages)[0];
  const info = page.imageinfo[0];
  const meta = info.extmetadata;
  const dest = path.join(root, "public/images", img.out);
  await sleep(4000);
  const buf = await get(info.thumburl, false);
  await sharp(buf).resize({ width: img.width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  credits.push({
    file: `/images/${img.out}`,
    title: img.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, ""),
    author: strip(meta.Artist?.value) || "Unknown",
    license: meta.LicenseShortName?.value ?? "",
    source: info.descriptionurl,
  });
  console.log("✓", img.out);
  await sleep(4000);
}
// Lighter copies for phones: every image also gets a 1200px "-1200.webp" twin.
for (const img of IMAGES) {
  const src = path.join(root, "public/images", img.out);
  const small = src.replace(/\.webp$/, "-1200.webp");
  await fs.access(src).then(
    () => sharp(src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 74 }).toFile(small),
    () => {},
  );
}

credits.sort((a, b) => IMAGES.findIndex((i) => a.file.endsWith(i.out)) - IMAGES.findIndex((i) => b.file.endsWith(i.out)));
await fs.writeFile(creditsPath, JSON.stringify(credits, null, 2) + "\n");
