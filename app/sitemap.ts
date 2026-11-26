import type { MetadataRoute } from "next";
import { portfolioUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: portfolioUrl.href }];
}
