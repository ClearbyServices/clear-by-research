import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import HomePageClient from "@/components/HomePageClient";

// Force dynamic rendering so SEO updates from LeadDesk go live immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const { data, error } = await supabase
    .from("home_hero")
    .select("meta_title, meta_description")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Metadata fetch error:", error.message);
  }

  return {
    title:
      data?.meta_title?.trim() ||
      "PhD Research Guidance from Expert Consultants | 11+ Yrs of Exp. | E-Clearby Research",
    description:
      data?.meta_description?.trim() ||
      "Get PhD thesis guidance from experts with 11+ years of experience. Personalized, integrity-first coaching and affordable dissertation consultation for your research.",
    alternates: {
      canonical: "https://www.clearbyresearch.com/",
    },
  };
}

export default function Page() {
  return <HomePageClient />;
}