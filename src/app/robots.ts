import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // TODO: Replace with your actual site URL before deployment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: '/private/', // Example: if you had private pages
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
