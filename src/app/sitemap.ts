import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/content/routes";

export const dynamic = "force-static";

// Indexable pages only (/credits/ is noindex). Trailing slashes match `trailingSlash: true`.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified, priority });
  return [
    page("/", 1),
    page("/routes/", 0.9),
    ...routes.map((r) => page(`/routes/${r.slug}/`, 0.8)),
    page("/about/", 0.5),
    page("/contact/", 0.6),
  ];
}
