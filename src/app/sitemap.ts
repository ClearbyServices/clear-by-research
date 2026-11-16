import { MetadataRoute } from 'next';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.clearbyresearch.com';

  // 1. Define your static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/phd-thesis-guidance-and-research-support',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Fetch all dynamic service slugs from Supabase
  const { data: services } = await supabase
    .from('services')
    .select('slug, updated_at'); // Ensure you have an updated_at column in Supabase

  const dynamicRoutes = (services || []).map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    // Use the database timestamp if available, otherwise use current date
    lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine and return
  return [...staticRoutes, ...dynamicRoutes];
}