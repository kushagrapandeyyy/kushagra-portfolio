import type { MetadataRoute } from "next";
import { portfolioUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", portfolioUrl).href,
  };
}
