import type { MetadataRoute } from "next";
import { notFound } from "next/navigation";
import { portfolioUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!portfolioUrl) notFound();
  return [{ url: portfolioUrl.href }];
}
